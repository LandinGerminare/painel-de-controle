import { MenuItem, menuOptions } from "@/utils/MenuOptions";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import useLayout from "@/context/Layout";
import useAuth from "@/context/Auth";

interface SideBarProps {
  selectedMenu: MenuItem | null;
  onChangeMenu: (newMenu: MenuItem) => void;
}

export default function SideBar(props: SideBarProps) {
  const router = useRouter()
  const { clearCredentials, isAdmin } = useAuth();
  const { collapsed, setCollapsed } = useLayout()

  return (
    <nav className={`flex flex-col bg-neutral-800 ${collapsed ? "w-20" : "w-60"}`}>
      <div className="flex flex-col flex-1 p-2 gap-4">
        <div className={`pt-3 pl-1 flex flex-row items-center text-white justify-between ${collapsed ? "m-auto" : "justify-start"}`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-neutral-700 rounded-full p-2"
          >
            <HiOutlineMenu size={22} />
          </button>
          {!collapsed && (
            <div className={`flex items-center overflow-hidden transition-all duration-300`}>
              <img src="/images/germinare_logo.png" className="h-9 -ml-3" />
            </div>
          )}
        </div>
        {menuOptions.map((e) => {
          const Icon = e.icon;
          if (e.route === "/client-registration" && !isAdmin()) {
            return null;
          }

          return (
            <SideBarItem
              key={e.name}
              isSelected={props.selectedMenu?.route === e.route}
              onClick={() => {
                if (!e.inDevelopment) {
                  props.onChangeMenu(e);
                }
              }}
              icon={Icon}
              text={e.name}
              collapsed={collapsed ?? false}
              inDevelopment={e.inDevelopment}
            />
          );
        })}
        <div className="flex flex-col flex-1"></div>
        <SideBarItem
          isSelected={false}
          text="Sair"
          onClick={() => {
            clearCredentials();
            router.push("/")
          }}
          icon={MdLogout}
          collapsed={collapsed ?? false}
        />
        <div className="h-4"></div>
      </div>
    </nav>
  )
}