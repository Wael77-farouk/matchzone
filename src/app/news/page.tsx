import { getNewsInfo } from "@/api";
import Image from "next/image";

export default async function NewsPage() {
  const news = await getNewsInfo();
  const articles = news?.articles || [];

  return (
    <section className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8 text-white bg-[#0F1214] min-h-screen">
      
      {/* العنوان */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-right">
        أحدث أخبار كرة القدم
      </h1>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 gap-8 sm:gap-10">

        {/* محتوى الأخبار */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles.length === 0 && (
            <p className="text-gray-400 text-lg text-right">
              لا توجد أخبار متاحة حالياً.
            </p>
          )}

          {articles.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-[#1b1f27] rounded-xl overflow-hidden shadow-lg transition transform sm:hover:scale-105 duration-300"
            >
              
              {/* الصورة */}
              {item.urlToImage && (
                <div className="relative w-full h-48 sm:h-52 lg:h-56">
                  <Image
                    src={item.urlToImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* المحتوى */}
              <div className="p-4">
                <h2 className="font-semibold text-lg sm:text-xl mb-2 line-clamp-2 text-right">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm sm:text-base mb-3 line-clamp-3 text-right">
                  {item.description || "لا يوجد وصف متاح."}
                </p>

                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3">
                  <span>{item.source?.name}</span>
                  <span>{new Date(item.publishedAt).toLocaleDateString("ar-EG")}</span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  className="inline-block w-full text-center py-2 sm:py-3 bg-red-600 rounded-md hover:bg-red-700 transition"
                >
                  اقرأ المزيد
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
