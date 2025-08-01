import { Cloud, CreditCard, Database, Settings, Folder, HelpCircle, Keyboard, Server } from "lucide-react";
import SearchFooter from "./search-footer";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useKeyboardShortcuts } from "@/hooks/hook-keyboard-shortcuts";
import { HelpCenterData } from "@/types/sidebar";
import { useDataStore } from "@/store/dataStore";
import { getLucideIcon } from "@/components/ui/icon-wrapper";
import { useRouter } from "next/navigation";

export function SearchItemList({ items, selectedIndex }: {
  items: { icon: React.ReactNode; title: string; description: string }[];
  selectedIndex: number;
}) {

  const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);
  const router = useRouter();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto bg-white h-[350px] p-3">
      {sidebarTopics.map((item, i) => {

        const Icon = getLucideIcon(item.icon);

        return (
          <button
            key={i}
            className={clsx(
              "focus:outline-none focus:ring-0 focus:border-transparent",
              "flex items-center w-full cursor-pointer hover:border-blue-500 rounded-md border-2 border-[#0000] text-left p-[8px] transition",
              i === selectedIndex
                ? "bg-indigo-50 dark:bg-primary-dark"
                : "hover:bg-indigo-50 dark:hover:bg-secondary-dark"
            )}
            onClick={() => router.push(`/${item.slug}`)}
          >
            <div className="text-primary 600 mr-2 mt-1 bg-neutral p-[5px] rounded-md">
              <Icon className="p-[4px]" />
            </div>
            <div className="min-w-0"> {/* Adicione esta classe para evitar que o flex item cresça */}
              <h4 className="font-medium text-[13px] text-gray-800 truncate"> {/* Adicione truncate aqui */}
                {item.title}
              </h4>
              <p className="text-sm text-[11px] text-gray-500 truncate"> {/* Adicione truncate aqui */}
                {item.subtitle}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
export function SearchList() {

  const t = useTranslations("header.dialogSearch.services");

  const items = [
    {
      icon: <Server className="w-4 h-4" />,
      title: t("vps.title"),
      description: t("vps.description"),
    },
    {
      icon: <Cloud className="w-4 h-4" />,
      title: t("bucket.title"),
      description: t("bucket.description"),
    },
    {
      icon: <Settings className="w-4 h-4" />,
      title: t("api.title"),
      description: t("api.description"),
    },
    {
      icon: <Database className="w-4 h-4" />,
      title: t("database.title"),
      description: t("database.description"),
    },
    {
      icon: <Folder className="w-4 h-4" />,
      title: t("shared_storage.title"),
      description: t("shared_storage.description"),
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      title: t("payment.title"),
      description: t("payment.description"),
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavigateUp = () => {
    console.log("Navigate Up");
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNavigateDown = () => {
    console.log("Navigate Down");
    setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  useKeyboardShortcuts({
    onSelect: () => handleSelect(items[selectedIndex]),
    onNavigateUp: handleNavigateUp,
    onNavigateDown: handleNavigateDown,
  });
  // Ação ao pressionar Enter
  const handleSelect = (item: { title: string }) => {
    alert(`Selecionado: ${item.title}`);
    // Ou qualquer lógica de ação
  };

  return (
    <div className="rounded-xl shadow-xl w-full">
      <SearchItemList items={items} selectedIndex={selectedIndex} />
      <SearchFooter />
    </div>
  )
}