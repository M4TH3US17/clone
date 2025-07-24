import { sidebar } from "@/data/sidebar";
import { SidebarItem } from "@/types/sidebar";
import clsx from "clsx";
import Link from "next/link";

const CategoriesHome = () => {
    
    const CategoryItem = ({ category }: {category: SidebarItem}) => {

        return (
          <Link
            href={category.title}
            className={clsx(
              "bg-white rounded-xl border border-gray-200 cursor-pointer flex flex-col p-3",
              "flex-1 min-w-[250px]  md:max-w-[350px]"
            )}
      
          >
            <div className="flex flex-col gap-4 justify-start items-start">
              <div
                className={
                  clsx(
                    "rounded-full bg-[#374151] p-2",
                    "flex items-center justify-center",
                    "w-15 h-15 lg:w-10 lg:h-10 text-gray-100"
                  )
                }
              > 
                {category.iconHtml}
              </div>
      
              <h3
                className={
                  clsx(
                    " mb-2 lg:mb-3  leading-tight",
                    "font-semibold text-gray-600 text-2xl lg:text-base"
                  )
                }
      
              >
                {category.title}
              </h3>
              {category.description && (
                <p
                  className={
                    clsx(
                      "mb-2 lg:mb-3 leading-relaxed flex-1",
                      "text-gray-600 text-[1rem] lg:text-sm",
                    )
                  }
                >
                  {category.description}
                </p>
              )}
              <p
                className={
                  clsx(
                    "text-xs text-gray-400 font-medium tracking-wide mt-auto",
                  )
                }
              >
                [0] ARTICLES
              </p>
            </div>
          </Link>
        )
    }
    return (
      <section
        className={
          clsx(
            "relative",
          )
        }
      >
          <h2 className={
              clsx(
                  "text-xl font-semibold text-gray-600 mb-6 p-4",
              )
          }> Todas as categorias </h2>
          <div
          className={clsx(
              "p-3",
              "flex flex-wrap justify-center gap-5 w-full max-w-screen-xl mx-auto px-4"
          )}
          >
            {sidebar.items.map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
      </section>
    )
}

export default CategoriesHome;