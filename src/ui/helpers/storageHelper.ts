export function saveToLocalStorage(key: string, data: unknown) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: string) {
  const cartJson = window.localStorage.getItem(key);

  if (cartJson) {
    return JSON.parse(cartJson);
  }
}
