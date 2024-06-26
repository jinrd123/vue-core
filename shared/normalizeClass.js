import { isString, isArray, isObject } from "./isType.js";

export function normalizeClass(klass) {
    let result = '';
    const traverse = (root) => {
        if(isString(root)) {
            result += root + ' ';
        } else if(isArray(root)) {
            for(let i = 0; i < root.length; i ++) {
                traverse(root[i]);
            }
        } else if(isObject(root)) {
            let objProps = '';
            for(const name in root) {
                if(root[name]) {
                    objProps += (name + ' ');
                }
            }
            result += objProps;
        }
    }
    traverse(klass);
    return result.trim();
}