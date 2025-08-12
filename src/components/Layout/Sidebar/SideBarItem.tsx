interface SideBarItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  collapsed?: boolean;
}

export default function SideBarItem(props: SideBarItemProps) {
  return (
    <div
      onClick={props.onClick}
      className={`cursor-pointer flex flex-row items-center h-12 text-white font-normal hover:bg-neutral-700 rounded-full transition-all duration-300 ${props.isSelected ? "bg-primary-600 hover:bg-primary-700" : ""
        } ${props.collapsed ? "justify-center" : "justify-start p-3 "}`}
    >
      {props.icon && <props.icon size={20} />}
      {!props.collapsed && <span className="ml-2">{props.text}</span>}
    </div>
  );
}
