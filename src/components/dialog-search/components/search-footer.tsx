import clsx from "clsx";
import { useTranslations } from "next-intl";

const SearchFooter = () => {
    
    const t = useTranslations("header.dialogSearch.footer");
    
    const shortcutClass = clsx(
        "px-2 py-0.5 border rounded bg-gray-100 dark:bg-secondary-dark",
        "border-neutral-light dark:border-gray-600"
    );
      
    return (
        <div
            className={clsx(
                "flex justify-between items-center px-4 py-2",
                "border-t text-sm text-gray-500 dark:text-gray-400",
                "border-gray-200 dark:border-gray-700"
            )}
            >
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <span>{t("select")}</span>
                    <span className={shortcutClass}>↵</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>{t("navigate")}</span>
                    <span className={shortcutClass}>↑</span>
                    <span className={shortcutClass}>↓</span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span>{t("close")}</span>
                <span className={shortcutClass}>ESC</span>
            </div>
        </div>
    );
  
}
export default SearchFooter;  