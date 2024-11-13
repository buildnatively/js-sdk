function getGlobalContext() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof self !== 'undefined') {
    return self;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof window !== 'undefined') {
    return window;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof global !== 'undefined') {
    return global;
  }
  return null;
}
var globalContext = getGlobalContext();
export default globalContext;