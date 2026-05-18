import Notifier from "@pourianof/notifier";

export interface ChangeNotifier {
  notifyListeners(): void;

  subscribeChanges(onChange: VoidFunction): { cancel(): void };
}

export abstract class ChangeNotifierIml implements ChangeNotifier {
  private notifier = new Notifier<"change">();

  notifyListeners() {
    this.notifier.trigger("change");
  }

  subscribeChanges(onChange: VoidFunction) {
    return this.notifier.addListener("change", onChange);
  }
}
