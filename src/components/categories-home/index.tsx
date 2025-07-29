import { useDataStore } from "@/store/dataStore";
import { HelpCenterData, Topic } from "@/types/sidebar";
import clsx from "clsx";
import Link from "next/link";
import { getLucideIcon } from "../ui/icon-wrapper";

const CategoriesHome = () => {

  const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);

  const TopicItem = ({ topic }: { topic: Topic }) => {

    const Icon = getLucideIcon(topic.icon);

    return (
      <Link
        href={topic.title}
        className={clsx(
          "relative bg-white rounded-[3%] border border-gray-300 cursor-pointer flex flex-col p-[20px]",
          "flex-1 h-[225px] w-[256px]",//  min-w-[220px] md:max-w-[350px] max-h-[240px]
          "aspect-square py-4"
        )}

      >
        <div className="flex flex-col gap-3  lg:gap-4 justify-start items-start">
          <div
            className={
              clsx(
                "rounded-full bg-gray-100 p-2",
                "flex items-center justify-center",
                "h-12 w-12 lg:w-10 lg:h-10 text-gray-100 mb-3"
              )
            }
          >
            <Icon className="w-6 h-6 text-gray-600" />
          </div>

          <h3
            className={
              clsx(
                "mb-1.5 leading-5",
                "text-gray-600 font-semibold text-[18px]"
              )
            }

          >
            {topic.title}
          </h3>
          {topic.subtitle && (
            <p
              className={
                clsx(
                  "leading-4.5 flex-1",
                  "text-gray-600 md:text-[13px] mb-3",
                )
              }
            >
              {topic.subtitle}
            </p>
          )}
          <p
            className={
              clsx(
                "absolute bottom-0 mb-4 text-[13px] md:text-[9px] text-black font-medium tracking-wide",
              )
            }
          >
            {`(${topic.articles.length} ARTIGOS)`}
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
          "mx-0",
          "max-w-[532px] 2lg:max-w-[808px] xl:max-w-[1084px]"
        )
      }
    >
      <h2 className={
        clsx(
          "lg:mb-3 lg:text-[1.1rem] text-xl font-medium text-gray-600 mb-4",
        )
      }> Todas as categorias </h2>
      <div
        className={clsx(
          "pt-1",
          "flex flex-wrap justify-center gap-5 xl:max-w-[1084px]",
        )}
      >
        {sidebarTopics.map((topic: Topic, index: number) => (
          <TopicItem key={index} topic={topic} />
        ))}
      </div>
    </section>
  )
}

export default CategoriesHome;