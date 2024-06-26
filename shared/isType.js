export const isString = (val) => typeof val === 'string';

export const isArray = Array.isArray;

export const isObject = (val) => {
    return val !== null && typeof val === 'object';
}