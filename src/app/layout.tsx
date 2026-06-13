import { CartHandlerProvider } from "@/ui/contexts/cart/cartContext";
import { ModalContainer } from "@/ui/modal/modalContainer";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { auth } from "../../auth";
import { CategorySSInjector } from "./_components/categorySSInjector";
import { DashboardLinkButton } from "./_components/dashboardLinkButton";
import { Footer } from "./_components/footer/footer";
import { Header } from "./_components/header/header";
import { RhfDevToolsClient } from "./_components/rhfDevToolsClient";
import { RoutePath } from "./_components/routePath";
import { SafelyHealthyApiRender } from "./_components/safelyHealthyApiRender";
import { Wrapper } from "./_shared/wrapper";
import "./_styles/global.css";
import { CCQueryClientProvider } from "./dashboard/categories/_components/queryClientProvider";

const interFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={interFont.className}>
        <RhfDevToolsClient>
          <SafelyHealthyApiRender>
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
          </SafelyHealthyApiRender>
        </RhfDevToolsClient>
      </body>
    </html>
  );
}
