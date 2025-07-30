import clsx from "clsx";
import { useTranslations } from "next-intl";

const SearchFooter = () => {

    const t = useTranslations("header.dialogSearch.footer");

    const shortcutClass = clsx(
        "px-2 py-0.5 rounded bg-white text-black",
       "shadow-none text-[0.8rem]"
    );

    return (
        <div
            className={clsx(
                "flex justify-between items-center px-4 py-2",
                "text-sm text-gray-500 dark:text-gray-400",
                "bg-neutral-200 rounded-b-2xl shadow-xl-none",
            )}
        >
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <span className={shortcutClass + "text-[1rem]"}>↵</span>
                    <span className="text-xs font-medium text-stone-500">{t("select")}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={shortcutClass}>↑</span>
                    <span className={shortcutClass}>↓</span>
                    <span className="text-xs font-medium text-stone-500">{t("navigate")}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-stone-500">{t("close")}</span>
                <span className={clsx("text-xs", shortcutClass)}>ESC</span>
            </div>
        </div>
    );

}
export default SearchFooter;  