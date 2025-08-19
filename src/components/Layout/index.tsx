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
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-neutral-900">
      <div>
        <Header />
      </div>
      <div className="w-full h-full flex flex-row">
        <SideBar
          selectedMenu={selectedMenu}
          onChangeMenu={(newMenu) => {
            setSelectedMenu(newMenu);
            router.push(newMenu.route);
          }}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 h-full flex flex-col gap-4 relative p-8">
            {renderContent(children)}
          </div>
        </div>
      </div>
      {modalContent && <Modal>{modalContent}</Modal>}
    </div>
  )

  function renderContent(children: ReactNode) {
    return children;
  }
}