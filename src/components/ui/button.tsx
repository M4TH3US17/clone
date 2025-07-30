import clsx from "clsx";
import { FC, ReactElement } from "react";

const Button: FC<{ icon: ReactElement, label: string, className?: string }> = ({ icon, label, className }) => {

  return (
    <div className={
      clsx(
        "p-2 flex gap-3 border",
        "items-center cursor-pointer",
        " text-[13px]",
        className
      )
    }>
      {label}
      {icon}
    </div>
  )
}

export default Button;