const { v4: uuidv4 } = require('uuid');
const ProviderA = require('./providers/MockProviderA');
const ProviderB = require('./providers/MockProviderB');
const RateLimiter = require('./RateLimiter');
const CircuitBreaker = require('./CircuitBreaker');
const Logger = require('../utils/Logger');
const ExponentialBackoff = require('../utils/ExponentialBackoff');

class EmailService {
    constructor() {
        this.providers = [new ProviderA(), new ProviderB()];
        this.rateLimiter = new RateLimiter(5, 60000); 
        this.statusMap = new Map();
        this.sentMessages = new Set();
        this.circuitBreakers = this.providers.map(() => new CircuitBreaker());
    }

    async sendEmail(email, messageId = uuidv4()) {
        if (this.sentMessages.has(messageId)) {
            Logger.info(`Duplicate detected: ${messageId}`);
            return this.statusMap.get(messageId);
        }

        if (!this.rateLimiter.allow()) {
            const status = { success: false, reason: "Rate limited" };
            this.statusMap.set(messageId, status);
            Logger.warn("Rate limit exceeded");
            return status;
        }

        for (let i = 0; i < this.providers.length; i++) {
            const provider = this.providers[i];
            const breaker = this.circuitBreakers[i];

            if (breaker.isOpen()) {
                Logger.warn(`Circuit open for provider ${i}`);
                continue;
            }

            let attempt = 0;
            const maxAttempts = 3;
            while (attempt < maxAttempts) {
                try {
                    await ExponentialBackoff.wait(attempt);
                    await provider.send(email);
                    this.sentMessages.add(messageId);
                    const status = { success: true, provider: provider.name };
                    this.statusMap.set(messageId, status);
                    Logger.info(`Email sent via ${provider.name}`);
                    return status;
                } catch (err) {
                    attempt++;
                    Logger.error(`Provider ${provider.name} failed: ${err.message}`);
                    if (attempt === maxAttempts) breaker.recordFailure();
                }
            }
        }

        const status = { success: false, reason: "All providers failed" };
        this.statusMap.set(messageId, status);
        return status;
    }

    getStatus(messageId) {
        return this.statusMap.get(messageId) || { success: false, reason: "Not found" };
    }
}

module.exports = EmailService;
