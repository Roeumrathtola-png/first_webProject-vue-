// Small helpers for saving plain values in localStorage as JSON

export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    // corrupt or unreadable value: behave as if nothing was saved
    return fallback
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeJSON(key) {
  localStorage.removeItem(key)
}
