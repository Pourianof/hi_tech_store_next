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
      <body>
        <Header />
        <Wrapper>
          <RoutePath />
        </Wrapper>
        <SessionProvider>
          <CCQueryClientProvider>
            <CategoryProvider
              categories={
                categoriesResult.status == "success"
                  ? categoriesResult.data
                  : undefined
              }
            >
              {props.children}
              {props.auth}
              <DashboardLinkButton />
            </CategoryProvider>
          </CCQueryClientProvider>
        </SessionProvider>
        <Footer />
        <Toaster position="bottom-center" gutter={10} />
      </body>
    </html>
  );
}
