import CategoriesHome from "@/components/categories-home";
import clsx from "clsx";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div
        className={clsx(
          "font-jakarta",
          "flex flex-col items-center",
          "gap-2 mt-20",
        )}

      >
        <section className="text-center">
          <h1 className="text-5xl lg:text-6xl text-gray-700 font-bold">Como podemos ajudar?</h1>
          <p
            className="text-gray-600 text-xl mb-8 lg:mb-6 leading-relaxed"
            
          >
            Encontre respostas, compreenda melhor e aprenda a <br/> trabalhar de forma mais agil no Pass.
          </p>

          {/* Main Search - Agora abre o modal ao clicar */}
          <div
            className={
              clsx(
                "relative mx-10 px-4 cursor-pointer",
                "rounded-xl border border-gray-200",
                "flex justify-between items-center",
                "text-gray-500 hover:text-gray-700"
                
              )
            }
          >
            <div className="flex items-center">
              <Search
                className="w-5 h-5"
              />
              <div className={
                clsx(
                  "pl-2 py-3 w-full",
                  "text-[13px] font-semibold"
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
                    "rounded p-2"
                  )
                }
              >
                CTRL
              </div>
              <div
                className={
                  clsx(
                    "bg-gray-100",
                    "rounded p-2"
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
