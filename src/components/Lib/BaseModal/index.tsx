import useModal from "@/context/Modal";
import { motion } from "framer-motion";
import { X } from "phosphor-react";

interface BaseModalI {
  containerStyle?: string;
  closeFunction?: () => void;
  title: string;
  children?: React.ReactNode;
  bodyStyle?: string;
}

export default function BaseModal({
  containerStyle,
  children,
  bodyStyle,
  title,
  closeFunction,
}: BaseModalI) {
  const { setModalContent } = useModal();

  return (
    <motion.div
      className={`rounded-base overflow-hidden rounded-md flex flex-col z-[999] ${containerStyle}`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`flex bg-neutral-900 items-center px-8 py-4`}>
        <p className="text-white text-2xl font-semibold">{title}</p>
        <div
          className="bg-neutral-800 text-white p-3 rounded-lg cursor-pointer ml-auto"
          onClick={() => {
            setModalContent(null);
            closeFunction && closeFunction();
          }}
        >
          <X size={18} />
        </div>
      </div>
      <div
        className={`bg-neutral-800 flex-1 overflow-x-auto overflow-y-auto scrollbar transition-all text-white px-8 py-4 ${bodyStyle}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
