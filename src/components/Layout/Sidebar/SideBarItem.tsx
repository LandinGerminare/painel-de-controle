import { FaLock } from "react-icons/fa";

interface SideBarItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  collapsed?: boolean;
  inDevelopment?: boolean;
}

export default function SideBarItem(props: SideBarItemProps) {
  return (
    <div
      onClick={props.onClick}
      className={`cursor-pointer flex flex-row items-center h-12 text-white font-normal hover:bg-neutral-700 rounded-full transition-all duration-300 ${props.isSelected ? "bg-primary-600 hover:bg-primary-700" : ""
        } ${props.collapsed ? "justify-center" : "justify-start p-3 "} ${props.inDevelopment ? "cursor-not-allowed opacity-50" : ""}`}
      title={props.inDevelopment ? "Em Desenvolvimento" : undefined}
    >
      {props.icon && <props.icon size={20} />}
      {!props.collapsed && <span className="ml-2">{props.text}</span>}
      {props.inDevelopment && !props.collapsed && (
        <div className="ml-auto">
          <FaLock size={16} />
        </div>
      )}
    </div>
  );
}
