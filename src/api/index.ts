import { apiOptions, matchesType } from "@/types";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.NEXT_PUBLIC_API_TOKEN!,
    "Content-Type": "application/json",
  },
};

export const getMatchesfootball = async () => {
  const matchData = await fetch("https://api.football-data.org/v4/matches", options);
  return matchData.json();
};

// === Yesterday date for finished matches ===
const todayDate = new Date();
const getDateMonth = new Date(todayDate.getTime());
getDateMonth.setDate(todayDate.getDate() - 1);
const year = getDateMonth.getFullYear();
const month = String(getDateMonth.getMonth() + 1).padStart(2, "0");
const day = String(getDateMonth.getDate()).padStart(2, "0");

const yesterday = [year, month, day].join("-");

export const getMatchesfootballFinished = async () => {
  const matchData = await fetch(
    `https://api.football-data.org/v4/matches?date=${yesterday}`,
    options
  );
  return matchData.json();
};

// === Arabic football news (excluding Al Jazeera) ===
export const getNewsInfo = async () => {
  try {
    const newsData = await fetch(
      `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}&q=كرة القدم&language=ar&pageSize=20`,
      { next: { revalidate: 300 } }
    );

    const json = await newsData.json();
    
    if (!json?.articles) {
      throw new Error('No articles found');
    }

    // فلتر: شيل أي خبر من الجزيرة أو بدون صورة
    const filteredArticles = json.articles.filter((article: any) => {
      const isAljazeera = article.url?.includes('aljazeera.net') || 
                          article.source?.name?.includes('Al Jazeera') ||
                          article.source?.name?.includes('الجزيرة');
      const hasValidImage = article.urlToImage && 
                           !article.urlToImage.includes('aljazeera.net');
      
      return !isAljazeera && hasValidImage;
    });

    // خد أول 9 أخبار بعد الفلترة
    const articles = filteredArticles.slice(0, 9).map((article: any) => ({
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage || '/img/news-football.webp',
      publishedAt: article.publishedAt,
      description: article.description,
      source: article.source
    }));

    // لو بعد الفلترة مفيش أخبار كفاية، ارجع placeholder
    if (articles.length === 0) {
      return {
        articles: [
          {
            title: 'لا توجد أخبار متاحة حالياً',
            url: '#',
            urlToImage: '/img/news-football.webp',
            publishedAt: new Date().toISOString(),
            source: { name: 'MatchZone' }
          }
        ]
      };
    }

    return { articles };
  } catch (err) {
    console.log("NEWS ERROR:", err);
    return { 
      articles: [
        {
          title: 'عذراً، لا يمكن تحميل الأخبار حالياً',
          url: '#',
          urlToImage: '/img/news-football.webp',
          publishedAt: new Date().toISOString(),
          source: { name: 'MatchZone' }
        }
      ] 
    };
  }
};

export const getStandingInfo = async () => {
  const standingData = await fetch(
    `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_API_TOKEN}&q=soccer&pageSize=5`,
    { next: { revalidate: 20 } }
  );
  return standingData.json();
};

export const filterLeague = async (filterData: string) => {
  const getEnglishLeague = await getMatchesfootball();
  const filterPremierLeague: matchesType[] = getEnglishLeague?.matches;
  const getData = filterPremierLeague.filter(
    (item) => item.competition.name === filterData
  );
  return getData;
};
