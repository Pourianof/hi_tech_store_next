import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { DashboardLinkButton } from "./_components/dashboardLinkButton";
import { getCategories } from "@/api/categoryApi";
import { CategoryProvider } from "@/ui/contexts/categoriesContext";

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  const categoriesResult = await getCategories();

  return (
    <html>
      <body>
        <Header />
        <SessionProvider>
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
        </SessionProvider>
        <Toaster position="bottom-center" gutter={10} />
      </body>
    </html>
  );
}
