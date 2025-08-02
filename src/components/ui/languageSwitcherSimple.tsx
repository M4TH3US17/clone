"use client";

import { useState, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "react-use";
import BRFlag from "@/publicassets/images/flags/br.svg";
import USFlag from "@/publicassets/images/flags/us.svg";
import ESFlag from "@/publicassets/images/flags/es.svg";

import { useLocale } from "next-intl";
import { Locale } from "@/i18n/request";
import { usePathname, useRouter } from "@/i18n/navigation";

interface Language {
  name: string;
  country: string;
  locale: Locale;
  flag: StaticImageData;
}

interface LanguageSwitcherSimpleProps {
  textColor?: string; // Permite personalizar a cor do texto
  dropdownPosition?: "top" | "bottom"; // Controla a posição do dropdown
  showCountry?: boolean; // Opção para mostrar ou não o país
  className?: string; // Classes adicionais para o componente
}

const languages: Language[] = [
  {
    name: "Português",
    country: "Brasil",
    locale: "pt",
    flag: BRFlag,
  },
  {
    name: "English",
    country: "USA",
    locale: "en",
    flag: USFlag,
  },
  {
    name: "Espanhol",
    country: "Espanha",
    locale: "es",
    flag: ESFlag,
  },
];

const LanguageSwitcherSimple = ({
  textColor = "text-[#222222]",
  dropdownPosition = "bottom",
  showCountry = true,
  className = "",
}: LanguageSwitcherSimpleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const getCurrentLanguage = (): Language => {
    return (
      languages.find((lang) => lang.locale === currentLocale) || languages[0]
    );
  };

  const switchLanguage = (language: Language) => {
    setIsOpen(false);
    if (language.locale !== currentLocale) {
      router.push(pathname, { locale: language.locale });
    }
  };

  const dropdownClasses = dropdownPosition === "top" 
    ? "bottom-full right-0 mb-2" 
    : "top-full right-0 mt-2";

  return (
    <motion.div
      className={`relative flex flex-col gap-2 ${className}`}
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        y: isLoaded ? 0 : 10,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer"
      >
        <Image
          src={getCurrentLanguage().flag}
          alt={getCurrentLanguage().locale}
          width={18}
          height={18}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropdownPosition === "top" ? 10 : -10 }}
            exit={{ opacity: 0, y: dropdownPosition === "top" ? 5 : -5 }}
          
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute overflow-hidden ${dropdownClasses} bg-white dark:bg-secondary-dark dark:border dark:border-bor-dark rounded-2xl p-3 shadow-lg min-w-[200px] z-10`}
          >
            {languages.map((language, index) => (
              <motion.button
                key={language.locale}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                onClick={() => switchLanguage(language)}
                className={`w-full px-4 py-2 my-2 text-muted rounded-2xl text-left hover:text-black flex items-center gap-3 cursor-pointer ${
                  language.locale === currentLocale
                    ? "bg-gray-200 dark:bg-neutral-800 text-muted"
                    : "hover:bg-gray-100 dark:hover:bg-neutral-900"
                }`}
              >
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-light dark:text-dark ">
                    {language.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {language.country}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LanguageSwitcherSimple;