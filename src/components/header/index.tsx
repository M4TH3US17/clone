import clsx from "clsx";
import { Search, CircleCheck, ExternalLink } from "lucide-react";
import Button from "../ui/button";
import LogoPass from "../ui/logo-pass";

const Header = () => {
    
    return (
        <header
            className={
                clsx(
                "sticky top-0",
                "border-b border-gray-200 px-6 xl:px-6 py-2.5 primary-bg-color",
                "bg-[#F5F5F5]",
                "border-b border-l border-gray-200"
                )
            }
        >
            <div className="flex items-center justify-between w-full">
                <div className="items-center gap-3 flex lg:hidden">
                    <LogoPass className="w-[110px]"/>
                    <div className="border-r border-gray-400"></div>
                    <span
                        className={
                            clsx(
                                "mt-1 py-1 px-2",
                                "text-gray-700 hover:text-gray-500 font-bold text-[13px] lg:text-xs",
                                "bg-white cursor-pointer rounded"
                            )
                        }
                    >Help Center</span>
                </div>
                <div 
                    className={
                        clsx(
                        "relative flex justify-between items-center",
                        "border border-gray-200 rounded-xl",
                        "p-2 gap-2"
                        )
                    }
                >
                   
                    <Search
                        className="text-gray-500 w-4 h-4"
                    />
                    <p className="font-semibold text-gray-500 mr-24">Search</p>
                    <div className="flex gap-1">
                        <span
                        className="text-xs text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded hidden lg:block"
                        > CTRL </span>
                        <span
                        className="text-xs text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded hidden lg:block"
                        > K </span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-2 lg:space-x-3">
                    <div className="flex items-center space-x-1">
                        <CircleCheck size={20} className="text-gray-500" />
                        <span
                        className="text-gray-500 font-semibold text-xs"
                        >All systems go</span>
                    </div>
                    <Button 
                        label="Open app" 
                        className=""
                        icon={<ExternalLink className="text-gray-600 w-4 h-4" />}/>
                
                </div>
            </div>
        </header>
    )
}

export default Header;