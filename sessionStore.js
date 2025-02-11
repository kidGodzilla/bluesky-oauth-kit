class InMemoryStore {
    constructor() {
        this.storeData = {};
    }

    async set(key, value) {
        this.storeData[key] = value;
    }

    async get(key) {
        return this.storeData[key] || undefined;
    }

    async del(key) {
        delete this.storeData[key];
    }
}

module.exports = new InMemoryStore();
