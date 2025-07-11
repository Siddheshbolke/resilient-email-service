class MockProviderB {
    constructor() {
        this.name = "MockProviderB";
    }

    async send(email) {
        if (Math.random() < 0.3) throw new Error("MockProviderB failure");
        return true;
    }
}

module.exports = MockProviderB;
