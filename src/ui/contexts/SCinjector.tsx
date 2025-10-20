import { ReactNode } from "react";
import { CCInjector, IInjectorContext } from "./CCInjector";

export async function SCInjector({
  dataKey,
  children,
  dataFetcher,
}: Omit<IInjectorContext, "data"> & {
  children: ReactNode;
}) {
  const data = await dataFetcher();

  return (
    <CCInjector data={data} dataKey={dataKey} dataFetcher={dataFetcher}>
      {children}
    </CCInjector>
  );
}
