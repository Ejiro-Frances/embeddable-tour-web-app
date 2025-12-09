import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import AuthGuard from "./_components/auth-guard";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-5 w-full">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}
