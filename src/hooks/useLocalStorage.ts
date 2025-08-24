import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isClient = typeof window !== 'undefined';

  // Start with the initial value during SSR to avoid "window is not defined" and hydration drift.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // After mount on the client, read from localStorage and sync state.
  useEffect(() => {
    if (!isClient) return;
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isClient]);

  // Write helper that is safe on SSR and keeps state in sync.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      if (isClient) {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
        }
      }
      return valueToStore;
    });
  }, [key, isClient]);

  // Keep multiple tabs/windows in sync for the same key
  useEffect(() => {
    if (!isClient) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setStoredValue(e.newValue ? (JSON.parse(e.newValue) as T) : initialValue);
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}" from storage event:`, error);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initialValue, isClient]);

  return [storedValue, setValue] as const;
}