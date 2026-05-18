import { ChangeNotifier } from "@/lib/changeNotifier/changeNofier";
import { ReactNode, useEffect, useState } from "react";
import { ChangeNotifierConstructor, useNotifier } from "./notifierProvider";

type Props<T extends ChangeNotifier> = {
  builder(notifier?: T): ReactNode;
  notifierType: ChangeNotifierConstructor<T>;
};

export function useChangeConsumer<T extends ChangeNotifier>(
  type: Props<T>["notifierType"],
) {
  const notifier = useNotifier(type);
  const [, setChagneCounter] = useState(0);

  useEffect(() => {
    if (!notifier) return;

    const sub = notifier.subscribeChanges(() => {
      setChagneCounter((c) => c + 1);
    });

    return () => sub.cancel();
  }, [notifier]);

  if (!notifier) {
    throw new Error(`no notifier defined for type "${type.name}"`);
  }

  return notifier;
}

export function Consumer<T extends ChangeNotifier>({
  builder,
  notifierType,
}: Props<T>) {
  const notifier = useChangeConsumer(notifierType);

  return builder(notifier);
}
