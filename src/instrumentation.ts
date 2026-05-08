export async function register() {
  const noop = () => null;
  const safe = {
    getItem: noop, setItem: noop, removeItem: noop,
    clear: noop, key: noop, length: 0,
  };

  // RTK injects --experimental-webstorage + --localstorage-file=<invalid>
  // into the Node.js process. This sets globalThis.localStorage to a broken
  // object (getItem is not a function) AFTER instrumentation runs.
  //
  // Fix: replace the localStorage property with a getter/setter pair.
  // The getter validates on every access — if the stored value is broken,
  // it returns our safe shim instead. This survives RTK overwriting it.
  let stored: unknown = (globalThis as any).localStorage ?? safe;

  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      enumerable: true,
      get() {
        if (
          stored != null &&
          typeof stored === "object" &&
          typeof (stored as Storage).getItem === "function"
        ) {
          return stored;
        }
        return safe;
      },
      set(v: unknown) {
        stored = v;
      },
    });
  } catch {
    // defineProperty failed (non-configurable) — direct overwrite as last resort
    try { (globalThis as any).localStorage = safe; } catch { /* noop */ }
  }
}
