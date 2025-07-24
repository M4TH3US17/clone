import clsx from "clsx";
import { FC, ReactElement } from "react";

const Button: FC<{ icon: ReactElement, label: string, className?: string }> = ({ icon, label, className }) => {

  return (
    <div className={
      clsx(
        "bg-white p-2 flex gap-3 rounded-xl border border-gray-200",
        "items-center cursor-pointer",
        "text-gray-500 font-semibold text-[13px]",
        "hover:text-gray-700 hover:border-gray-500",
        className
      )
    }>
      {label}
      {icon}
    </div>
  )
}

export default Button;