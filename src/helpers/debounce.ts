export default function debounce<T extends Function>(fn: T, delay: number): T & Debounced {
  let timeoutId: any = null;

  const debounced: any = function(this: any, ...args: any[]) {
    let self = this;
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

  return debounced;
}

interface Debounced {
  cancel(): void;
}
