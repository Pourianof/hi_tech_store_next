import { isHealthyApi } from "@/api/apiServerMisc";
import { CartHandlerProvider } from "@/ui/contexts/cart/cartContext";
import { ModalContainer } from "@/ui/modal/modalContainer";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { auth } from "../../auth";
import { CategorySSInjector } from "./_components/categorySSInjector";
import { DashboardLinkButton } from "./_components/dashboardLinkButton";
import { FailedBox } from "./_components/failedBox";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { RoutePath } from "./_components/routePath";
import { Wrapper } from "./_shared/wrapper";
import "./_styles/global.css";
import { CCQueryClientProvider } from "./dashboard/categories/_components/queryClientProvider";
import { RhfDevToolsClient } from "./_components/rhfDevToolsClient";

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  const isServerHealthy = await isHealthyApi();

  return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <RhfDevToolsClient>
          {isServerHealthy ? (
            <>
              <SessionProvider session={await auth()}>
                <CCQueryClientProvider>
                  <CartHandlerProvider>
                    <CategorySSInjector>
                      <Header />
                      <Wrapper>
                        <RoutePath />
                      </Wrapper>
                      {props.children}
                      {props.auth}
                      <DashboardLinkButton />
                    </CategorySSInjector>
                    <Footer />
                  </CartHandlerProvider>
                </CCQueryClientProvider>
              </SessionProvider>
              <ModalContainer />
              <Toaster position="bottom-center" gutter={10} />
            </>
          ) : (
            <FailedBox
              title="We are down"
              message="Server is not accessible for now. We will happy to see you soon some later"
            />
          )}
        </RhfDevToolsClient>
      </body>
    </html>
  );
}
