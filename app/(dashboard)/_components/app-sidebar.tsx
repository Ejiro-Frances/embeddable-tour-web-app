"use client";

import { useState } from "react";
import { Home, FileStack, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import LogoutModal from "./modals/logout-modal";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Tours",
    url: "/tours",
    icon: FileStack,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 ${
                          isActive
                            ? "bg-primary/10 dark:bg-gray-800 text-primary font-medium"
                            : "text-white"
                        }`}
                      >
                        <item.icon className={isActive ? "text-primary" : ""} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-2 border-t pt-5 cursor-pointer hover:text-red-500 transition"
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </div>

        <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
