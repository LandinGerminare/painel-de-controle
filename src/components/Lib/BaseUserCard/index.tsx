
interface BaseUserCardI {
  children: React.ReactNode;
  containerStyle?: string
}

export default function BaseUserCard({ children, containerStyle }: BaseUserCardI) {
  return (
    <div className={`flex-shrink-0 min-w-24 min-h-32 rounded-xl bg-neutral-700 ${containerStyle}`}>
      {children}
    </div>
  )
}
