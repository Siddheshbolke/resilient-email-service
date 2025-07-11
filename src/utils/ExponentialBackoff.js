class ExponentialBackoff {
    static async wait(attempt) {
        const delay = Math.pow(2, attempt) * 100;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

module.exports = ExponentialBackoff;
