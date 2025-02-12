var module = {
  exports: {}
};
var exports = module.exports;
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
module.exports = {
  InMemoryStore
};
export default module.exports;