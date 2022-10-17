export function isEmpty(value) {
    if (value == null) {
      return true
    }
    if (Array.isArray(value) || typeof value === 'string') {
      return !value.length;
    }
    const tag = toString.call(value);
    if (tag == '[object Map]' || tag == '[object Set]') {
      return !value.size
    }
    if (typeof value === 'object') {
      return !Object.keys(value).length
    }
    return true
}