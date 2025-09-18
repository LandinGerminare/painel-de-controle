import { MenuItem, menuOptions } from "@/utils/MenuOptions";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";
import useModal from "@/context/Modal";
import { Modal } from "../Lib/Modal";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const { modalContent, setModalContent } = useModal();

  useEffect(() => {
    const currentMainRoute = router.pathname.split("/")[1];

    const filteredMenuByRoute = menuOptions.filter(
      (e) => e.route.replace("/", "") === currentMainRoute
    );
    if (filteredMenuByRoute.length !== 0) {
      setSelectedMenu(filteredMenuByRoute[0]);
    }
  }, [router.pathname]);

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-neutral-900">
      <SideBar
        selectedMenu={selectedMenu}
        onChangeMenu={(newMenu) => {
          setSelectedMenu(newMenu);
          router.push(newMenu.route);
        }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col gap-4 relative overflow-hidden">
          {children}
        </div>
      </div>
      {modalContent && <Modal>{modalContent}</Modal>}
    </div>

  )
}