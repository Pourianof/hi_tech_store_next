"use client";

import { Channel, IChannel, IConsumable } from "@/lib/channel/channel";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { NoContextDefinedError } from "../errors/NoContextDefinedError";

type ChannelId = string | number;

interface IChannelContext<T> {
  channelIdentifier: ChannelId;
  channel: IChannel<T>;
}

const ChannelsListContext = createContext<IChannelContext<unknown>[]>([]);

export function useChannel<T>(channelId: ChannelId) {
  const context = useContext(ChannelsListContext);

  if (!context) {
    throw new NoContextDefinedError("Channel");
  }

  return context.find((c) => c.channelIdentifier == channelId)
    ?.channel as IChannel<T>;
}

export function useSink<T>(channelId: ChannelId) {
  const channelCtx = useChannel<T>(channelId);

  return channelCtx?.sink;
}

export function useConsumable<T>(channelId: ChannelId): IConsumable<T> {
  return useChannel<T>(channelId);
}

export function useConsumer<T>(
  channelId: ChannelId,
  onData: Parameters<IConsumable<T>["consume"]>[0]["onData"]
) {
  const consumable = useConsumable<T>(channelId);

  useEffect(() => {
    if (!consumable) {
      return;
    }
    const consumer = consumable.consume({
      onData,
    });
    return () => consumer.cancel();
  }, [consumable, onData]);
}

export function ChannelProvider<T>({
  channelIdentifier,
  children,
}: {
  children: ReactNode;
  channelIdentifier: ChannelId;
}) {
  const channelsListContext = useContext(ChannelsListContext);
  const channel = useRef(new Channel<T>());

  return (
    <ChannelsListContext.Provider
      value={[
        ...(channelsListContext ?? []),
        { channelIdentifier: channelIdentifier, channel: channel.current },
      ]}
    >
      {children}
    </ChannelsListContext.Provider>
  );
}
