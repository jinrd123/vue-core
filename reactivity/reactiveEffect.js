// Map<obj, Map<key, effectSet>>
export const reactiveEffect = new Map();

// Effect
let activeEffect;

export function trigger(targetObj, key) {
  let map = reactiveEffect.get(targetObj);
  if(!map) reactiveEffect.set(targetObj, map = new Map());
  let effectSet = map.get(key);
  if(!effectSet) map.set(key, effectSet = new Set());
  effectSet.forEach(effect => {
    effect.run();
  });
}

export function effect(callback) {
  const effectObj = new Effect(callback);
  effectObj.run();
}

export class Effect {
  constructor(callback) {
    this.callback = callback;
  }
  run() {
    activeEffect = this;

    this.callback();
  }
}

export function track(obj, key) {
  if(!activeEffect) return;
  let keyMap = reactiveEffect.get(obj);
  if(!keyMap) {
    keyMap = new Map();
    reactiveEffect.set(obj, keyMap);
  }
  let effectSet = keyMap.get(key);
  if(!effectSet) {
    effectSet = new Set();
    keyMap.set(key, effectSet);
  }
  effectSet.add(activeEffect);
}

