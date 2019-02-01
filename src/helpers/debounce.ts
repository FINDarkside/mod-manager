export default function debounce<T extends ((...args: any) => any)>(fn: T, delay: number): T & Debounced {
  let timeoutId: any = null;

  const debounced = function(this: any, ...args: any[]) {
    const self = this;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      const res = fn.apply(self, args);
      if (res && typeof res.catch === 'function') res.catch((err: Error) => console.error(err));
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId == null) return;
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced as T & Debounced;
}

interface Debounced {
  cancel(): void;
}
