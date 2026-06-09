"use client";
import Notifier from "@pourianof/notifier";
import { useEffect } from "react";

class StorageWatcher {
  private notifier = new Notifier<{
    [key: string]: { oldValue: string | null; newValue: string | null };
  }>();

  constructor() {
    window.addEventListener("storage", this.handleStorageChange);
  }

  private handleStorageChange = (event: StorageEvent) => {
    const { key, oldValue, newValue } = event;

    if (!key || oldValue == newValue) {
      return;
    }

    this.notifier.trigger(key, { oldValue, newValue });
  };

  watch(
    key: string,
    onChange: (oldValue: string | null, newValue: string | null) => void,
  ) {
    return this.notifier.addListener(
      key,
      ({ data: { newValue, oldValue } }) => {
        onChange(oldValue, newValue);
      },
    );
  }
}

let watcher: StorageWatcher | undefined;

export function useLocalStorageChange({
  storageKey,
  onChange,
}: {
  storageKey: string;
  onChange: (oldValue: string | null, newValue: string | null) => void;
}) {
  useEffect(() => {
    watcher ??= new StorageWatcher();

    const sub = watcher.watch(storageKey, onChange);

    return () => sub.cancel();
  }, [storageKey, onChange]);
}
