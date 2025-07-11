const EmailService = require('./services/EmailService');

(async () => {
    const emailService = new EmailService();
    const result = await emailService.sendEmail({ to: "test@example.com", subject: "Hello", body: "World" });
    console.log("Send Result:", result);
})();
