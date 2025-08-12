import { MenuItem, menuOptions } from "@/utils/MenuOptions";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import useLayout from "@/context/Layout";

interface SideBarProps {
  selectedMenu: MenuItem | null;
  onChangeMenu: (newMenu: MenuItem) => void;
}

export default function SideBar(props: SideBarProps) {
  const router = useRouter()

  const { collapsed } = useLayout()

  return (
    <nav className={`flex flex-col bg-neutral-800 ${collapsed ? "w-20" : "w-60"}`}>
      <div className="flex flex-col flex-1 p-2 gap-4">
        {menuOptions.map((e) => {
          const Icon = e.icon;
          return (
            <SideBarItem
              key={e.name}
              isSelected={props.selectedMenu?.route === e.route}
              onClick={() => {
                props.onChangeMenu(e);
              }}
              icon={Icon}
              text={e.name}
              collapsed={collapsed ?? false}
            />
          );
        })}
        <div className="flex flex-col flex-1"></div>
        <SideBarItem
          isSelected={false}
          text="Sair"
          onClick={() => {
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