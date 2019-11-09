export default {
  set(key, obj) {
    if (!key || !obj) {
      return;
    }
    if (localStorage.getItem(key)) {
      const oldStorage = localStorage.getItem(key);
      const newStorage = JSON.parse(oldStorage);
      const stored = obj;
      newStorage.push(stored);
      localStorage.setItem(key, JSON.stringify(newStorage));
    } else {
      const stored = [];
      stored.push(obj);
      localStorage.setItem(key, JSON.stringify(stored));
    }
  },
  get(key) {
    let value = localStorage.getItem(key);
    if (!value) {
      return;
    }
    value = JSON.parse(value);
    return value;
  },
  delete(key, obj) {
    const value = JSON.parse(localStorage.getItem(obj));

    if (!value) return;

    if (value.length <= 1 || key === 0) {
      value.shift();
    } else {
      value.splice(key, key);
    }

    localStorage[obj] = JSON.stringify(value);
  },
  update(name, key, value) {
    const data = JSON.parse(localStorage.getItem(name));
    data[key] = value;
    localStorage.setItem(name, JSON.stringify(data));
  },
  clear(one) {
    if (one) {
      const value = JSON.parse(localStorage.getItem(one));
      localStorage.removeItem(value);
    } else {
      localStorage.clear();
    }
  },
};
