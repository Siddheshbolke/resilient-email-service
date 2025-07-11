class MockProviderA {
    constructor() {
        this.name = "MockProviderA";
    }

    async send(email) {
        if (Math.random() < 0.7) throw new Error("MockProviderA failure");
        return true;
    }
}

module.exports = MockProviderA;
