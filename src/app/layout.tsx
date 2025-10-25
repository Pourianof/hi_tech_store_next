import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { DashboardLinkButton } from "./_components/dashboardLinkButton";
import { getCategories } from "@/api/categoryApi";
import { CategoryProvider } from "@/ui/contexts/categoriesContext";
import { RoutePath } from "./_components/routePath";
import { Wrapper } from "./_shared/wrapper";
import { Footer } from "./_components/footer";
import { CCQueryClientProvider } from "./dashboard/categories/_components/queryClientProvider";

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  const categoriesResult = await getCategories();

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <CategoryProvider
          categories={
            categoriesResult.status == "success"
              ? categoriesResult.data
              : undefined
          }
        >
          <Header />
          <Wrapper>
            <RoutePath />
          </Wrapper>
          <SessionProvider>
            <CCQueryClientProvider>
              {props.children}
              {props.auth}
              <DashboardLinkButton />
            </CCQueryClientProvider>
          </SessionProvider>
        </CategoryProvider>
        <Footer />
        <Toaster position="bottom-center" gutter={10} />
      </body>
    </html>
  );
}
