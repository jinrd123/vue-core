import { trigger, track } from './reactiveEffect.js';

// Map<obj, Proxy>
const reactiveObjMap = new Map();

export function reactive(obj) {
  return createReactiveObject(obj);
}

function createReactiveObject(obj) {
  if(reactiveObjMap.has(obj)) {
    const res = reactiveObjMap.get(obj);
    return res;
  } else {
    const reactiveObj = new Proxy(obj, {
      get(target, key) {
        track(target, key);
        const value = target[key];
        if(typeof value === 'object') {
          return reactive(value);
        } else {
          return value;
        }
      },
      set(target, key, value) {
        // 先set 再trigger
        const res = target[key] = value;
        trigger(target, key);
        return res;
      }
    })
    reactiveObjMap.set(obj, reactiveObj);
    return reactiveObj;
  }
}