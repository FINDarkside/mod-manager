export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function get(obj: any, path: string, defaultVal: any): any {
  const props = path.split('.');
  for (const prop of props) {
    obj = obj[prop];
    if (obj == null) return defaultVal;
  }
  return obj;
}

export function nextInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
