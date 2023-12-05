const  getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key]
}
  
const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
    obj[key] = value
}
  
const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

const extractTypes = (array: Array<Object>) => {
    const dataType: Object = {};
    array.forEach((el: any) => {
      if (dataType.hasOwnProperty(el.type)) {
        getProperty(dataType, el.type).push(el);
        return;
      }
      setProperty(dataType, el.type, [el]);
    });
    return dataType;
  };

export { getKeys, getProperty, setProperty, extractTypes }