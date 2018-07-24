export const isArray = (currArray: any) => {
  return Object.prototype.toString.call(currArray) === '[object Array]'
}