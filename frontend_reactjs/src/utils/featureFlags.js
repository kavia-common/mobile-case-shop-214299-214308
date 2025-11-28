 /**
  * PUBLIC_INTERFACE
  * parseFeatureFlags
  * Parses REACT_APP_FEATURE_FLAGS from .env (e.g., "mockApi=true,experiments=false")
  */
export function parseFeatureFlags(value) {
  /** This is a public function to parse flags into an object. */
  const out = {};
  if (!value) return out;
  try {
    // allow JSON object or comma-separated
    if (value.trim().startsWith('{')) {
      return JSON.parse(value);
    }
    value.split(',').forEach(pair => {
      const [k, v] = pair.split('=').map(s => (s || '').trim());
      if (!k) return;
      if (v === undefined || v === '') { out[k] = true; return; }
      if (v.toLowerCase() === 'true') out[k] = true;
      else if (v.toLowerCase() === 'false') out[k] = false;
      else if (!Number.isNaN(Number(v))) out[k] = Number(v);
      else out[k] = v;
    });
  } catch {
    // ignore parsing errors, return partial
  }
  return out;
}
