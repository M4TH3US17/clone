'use client';

import CategoriesHome from "@/components/categories-home";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useState } from "react";
import { returnData } from "../../public/assets/data/data-utils";
import '../../public/i18next/i18n';
import { useLanguageStore } from "@/store/languageStore";

export default function Home() {
  const currentLanguage = useLanguageStore((state) => state.language);
  const [data, setData] = useState<object>(returnData(currentLanguage))

  return (
    <div className=" flex flex-col justify-center items-center bg-neutral pb-[130px] lg:px-[12%] xl:px-[12%]">
      <div
        className={clsx(
          "font-jakarta",
          "flex flex-col items-center",
          "gap-2 mt-20 lg:w-1",
        )}

      >
        <section className="text-center lg:mb-[50px] xl:mb-[60px]">
          <h1
            className={clsx(
              "lg:text-5xl xl:text-[3.25rem] text-gray-700 ",
              "font-bold mb-2.5 whitespace-nowrap"
            )}
          >Como podemos ajudar?</h1>
          
          <p
            className="text-gray-600 text-md mb-6.5 xl:mb-7 leading-relaxed leading-snug"
          >
            Encontre respostas, compreenda melhor e aprenda a <br /> trabalhar de forma mais agil no Pass.
          </p>

          {/* Main Search - Agora abre o modal ao clicar */}
          <div
            className={
              clsx(
                "relative lg:mx-0 px-4 cursor-pointer",
                "rounded-lg ",
                "flex justify-between items-center",
                "text-primary text-secondary",
                "xl:mx-10 bg-white border border-gray-400 "
              )
            }
            // style={{border: "solid gray 1px"}}
          >
            <div className="flex items-center">
              <Search
                className="w-5 h-5"
              />
              <div className={
                clsx(
                  "pl-2.5 py-3 w-full",
                  "text-[13px] text-gray-600"
                )
              }>
                Procure ajuda nos artigos (ex: como configurar seu site)
              </div>
            </div>

            <div className={
              clsx(
                "hidden gap-2 lg:flex",
                "text-xs font-semibold"
              )
            }>
              <div
                className={
                  clsx(
                    "bg-gray-100",
                    "rounded-full px-2.5 py-1.5 text-[11px]"
                  )
                }
              >
                CTRL
              </div>
              <div
                className={
                  clsx(
                    "bg-gray-100",
                    "rounded px-2.5 py-1.5 text-[11px]"
                  )
                }
              >
                K
              </div>
            </div>
          </div>
        </section>

        <CategoriesHome />
      </div>
    </div>
  );
}
