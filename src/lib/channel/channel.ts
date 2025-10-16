import Notifier from "@pourianof/notifier";
export interface ISink<T> {
  add(data: T): void;
}

export interface IConsumer {
  cancel(): void;
}

export interface IConsumable<T> {
  consume(listen: { onData: (data: T) => void }): IConsumer;
}

const DEFAULT_CHANNEL = "default-channel";

class Sink<T> implements ISink<T> {
  constructor(private notifier: Notifier) {}

  add(data: T) {
    this.notifier.trigger(DEFAULT_CHANNEL, data);
  }
}

export interface IChannel<T> extends IConsumable<T> {
  close(): void;
  sink: ISink<T>;
}

export class Channel<T> implements IChannel<T> {
  private notifier: Notifier = new Notifier();

  get sink() {
    return new Sink<T>(this.notifier);
  }

  close(): void {
    this.notifier.clearify(DEFAULT_CHANNEL);
  }

  consume({ onData }: { onData: (data: T) => void }): IConsumer {
    return this.notifier.addListener(DEFAULT_CHANNEL, (event) => {
      onData(event.data);
    });
  }
}
