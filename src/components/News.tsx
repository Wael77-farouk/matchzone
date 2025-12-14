import Image from "next/image"
import Link from "next/link"
import { getNewsInfo } from "@/api"
import { newsType } from "@/types"

const News = async () => {
  const getNews = await getNewsInfo()
  const newsData: newsType[] = getNews.articles

  return (
    <div
      className="
        w-full
        sm:w-[320px]
        lg:w-[350px]
        bg-[rgb(40,46,58)]
        rounded-lg
        px-3 sm:px-4 lg:px-6
        py-3
      "
    >
      <h1 className="text-base sm:text-lg md:text-xl text-teal-400 font-bold mb-4">
        News – Top Headlines
      </h1>

      <div className="space-y-4">
        {newsData?.map((news, index) => {
          // استخدم placeholder لأي صورة مش شغالة
          const imageSrc = news?.urlToImage && 
                          !news.urlToImage.includes('aljazeera.net')
            ? news.urlToImage 
            : "/img/news-football.webp"

          return (
            <Link 
              key={`${news.title}-${index}`} 
              href={news.url || "#"} 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-full h-[140px] sm:h-[150px] group">
                <Image
                  src={imageSrc}
                  alt={news.title || "News"}
                  fill
                  className="object-cover rounded-md"
                  priority={index === 0}
                  unoptimized
                />

                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-zinc-900 to-transparent rounded-b-md">
                  <p className="
                    text-sm sm:text-base
                    font-semibold
                    line-clamp-2
                    group-hover:text-teal-400
                    transition
                  ">
                    {news.title}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default News