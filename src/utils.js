class ChromeStorage {
  constructor() {
    this.local = chrome.storage.local;
    this.get = this.getStorage;
    this.set = this.setStorage;
  }
  getStorage = (keys) => {
    const opt = {};
    if (keys.constructor.name === 'String') {
      opt[keys] = null;
    } else if (keys.constructor.name === 'Array') {
      keys.forEach(key => {
        opt[key] = null;
      });
    } else {
      console.warn('error::参数名不对');
      return resolve({});
    }
    return new Promise(resolve => {
      return this.local.get(opt, (item) => {
        return resolve(item);
      });
    })
  }
  setStorage = (param) => {
    return new Promise(resolve => {
      return this.local.set(param, () => {
        return resolve(true);
      });
    })
  }
  clear = () => {
    this.local.clear();
  }
}
export const storage = new ChromeStorage();