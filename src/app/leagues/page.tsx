'use client';
import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

export default function LeaguesPage() {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const Leagues = [
    // الدوريات الأوروبية الكبرى
    { 
      id: 1, 
      name: "Premier League", 
      nameAr: "الدوري الإنجليزي",
      href: "premier-league", 
      emblem: "/img/leagues/Premier.PNG" 
    },
    { 
      id: 2, 
      name: "La Liga", 
      nameAr: "الدوري الإسباني",
      href: "la-liga", 
      emblem: "/img/leagues/الدوري الاسباني.PNG" 
    },
    { 
      id: 3, 
      name: "Bundesliga", 
      nameAr: "الدوري الألماني",
      href: "bundesliga", 
      emblem: "/img/leagues/bundesliga.webp" 
    },
    { 
      id: 4, 
      name: "Serie A", 
      nameAr: "الدوري الإيطالي",
      href: "serie-a", 
      emblem: "/img/leagues/serie_a.webp" 
    },
    { 
      id: 5, 
      name: "Ligue 1", 
      nameAr: "الدوري الفرنسي",
      href: "ligue-1", 
      emblem: "/img/leagues/ligue_1.webp" 
    },
    { 
      id: 6, 
      name: "Eredivisie", 
      nameAr: "الدوري الهولندي",
      href: "Eredivisie", 
      emblem: "/img/leagues/شعار الدوري الهولندي.png" 
    },

    // الدوريات الأخرى
    { 
      id: 7, 
      name: "Champions League", 
      nameAr: "دوري أبطال أوروبا",
      href: "champions", 
      emblem: "/img/leagues/Champions League.PNG" 
    },
    { 
      id: 8, 
      name: "European League", 
      nameAr: "الدوري الأوروبي",
      href: "europeanchampionship", 
      emblem: "/img/leagues/شعار الدوري الاوروبي.PNG" 
    },
    { 
      id: 9, 
      name: "Brazil Serie A", 
      nameAr: "الدوري البرازيلي",
      href: "brazilian-series-a", 
      emblem: "/img/leagues/brazilian_serie_a.webp" 
    },
    { 
      id: 10, 
      name: "Copa Libertadores", 
      nameAr: "كوبا ليبرتادوريس",
      href: "copa-libertadores", 
      emblem: "/img/leagues/copa_libertadores.webp" 
    },
    { 
      id: 11, 
      name: "Copa Sudamericana", 
      nameAr: "كوبا سود أمريكانا", 
      href: "copa-sudo-cup", 
      emblem: "/img/leagues/suda.svg" 
    },

    // الدوريات العربية
    { 
      id: 12, 
      name: "Egyptian Premier League", 
      nameAr: "الدوري المصري",
      href: "egypt-league", 
      emblem: "/img/leagues/Egyptian_Premier_League_logo_2023.PNG" 
    },
    { 
      id: 13, 
      name: "Saudi Pro League", 
      nameAr: "دوري روشن السعودي",
      href: "saudi-league", 
      emblem: "/img/leagues/شعار_دوري_روشن_السعودي.svg" 
    },

    // الدوريات الأمريكية
    { 
      id: 14, 
      name: "Major League Soccer (MLS)", 
      nameAr: "دوري أمريكا",
      href: "mls", 
      emblem: "/img/leagues/MLS.jfif" 
    },

    // بطولات أفريقيا وآسيا
    { 
      id: 15, 
      name: "CAF Champions League", 
      nameAr: "دوري أبطال أفريقيا",
      href: "caf-champions-league", 
      emblem: "/img/leagues/دوري ابطال افريقيا.PNG" 
    },
    { 
      id: 16, 
      name: "CAF Confederation Cup", 
      nameAr: "كأس الكونفدرالية",
      href: "caf-cc", 
      emblem: "/img/leagues/CAF Confederation Cup.PNG" 
    },
    { 
      id: 17, 
      name: "AFC Champions League", 
      nameAr: "دوري أبطال آسيا",
      href: "afc-champions-league", 
      emblem: "/img/leagues/شعار_دوري_أبطال_آسيا_2021.svg.PNG" 
    },

    // الكؤوس — إنجلترا
    { 
      id: 18, 
      name: "FA Cup", 
      nameAr: "كأس إنجلترا",
      href: "fa-cup", 
      emblem: "/img/leagues/كاس انجلترا.PNG " 
    },
    { 
      id: 19, 
      name: "EFL Cup (Carabao Cup)", 
      nameAr: "كأس كاراباو",
      href: "efl-cup", 
      emblem: "/img/leagues/كاس كاراباو.PNG" 
    },

    // الكؤوس — إسبانيا
    { 
      id: 20, 
      name: "Copa del Rey", 
      nameAr: "كأس ملك إسبانيا",
      href: "copa-del-rey", 
      emblem: "/img/leagues/Copa_Del_Rey_Official_Logo.PNG" 
    },
    { 
      id: 21, 
      name: "Supercopa de España", 
      nameAr: "كأس السوبر الإسباني",
      href: "supercopa-espana", 
      emblem: "/img/leagues/شعار_كأس_السوبر_الإسباني (1).svg" 
    },

    // الكؤوس — ألمانيا
    { 
      id: 22, 
      name: "DFB-Pokal", 
      nameAr: "كأس ألمانيا",
      href: "dfb-pokal", 
      emblem: "/img/leagues/كاس المانيا.jfif" 
    },

    // الكؤوس — إيطاليا
    { 
      id: 23, 
      name: "Coppa Italia", 
      nameAr: "كأس إيطاليا",
      href: "coppa-italia", 
      emblem: "/img/leagues/كاس ايطاليا.PNG" 
    },

    // الكؤوس — فرنسا
    { 
      id: 24, 
      name: "Coupe de France", 
      nameAr: "كأس فرنسا",
      href: "coupe-de-france", 
      emblem: "/img/leagues/شعاركأس_فرنسا_لكرة_القدم.svg" 
    },

    // كؤوس عربية
    { 
      id: 25, 
      name: "Egypt Cup", 
      nameAr: "كأس مصر",
      href: "egypt-cup", 
      emblem: "/img/leagues/Egyptian_Cup_(football).PNG" 
    },
    { 
      id: 26, 
      name: "King's Cup (KSA)", 
      nameAr: "كأس الملك",
      href: "saudi-kings-cup", 
      emblem: "/img/leagues/شعار_كأس_خادم_الحرمين_الشريفين_2024.PNG" 
    },

    { 
      id: 27, 
      name: "Arab Cup 2025", 
      nameAr: "كأس العرب 2025",
      href: "arab-cup-2025", 
      emblem: "/img/leagues/كاس العرب 2025.jfif" 
    },
    { 
      id: 28, 
      name: "FIFA World Cup 2026", 
      nameAr: "كأس العالم 2026",
      href: "worldcup", 
      emblem: "/img/leagues/كاس العالم 2026.jfif" 
    },
        // بطولات دولية قارية
    { 
      id: 29, 
      name: "UEFA Euro", 
      nameAr: "بطولة أمم أوروبا (يورو)", 
      href: "uefa-euro", 
      emblem: "/img/leagues/uefa.JPG" 
    },
    { 
      id: 30, 
      name: "Africa Cup of Nations (AFCON)", 
      nameAr: "كأس أمم أفريقيا", 
      href: "afcon", 
      emblem: "/img/leagues/2025_Africa_Cup_of_Nations_logo.svg.png" 
    },
    { 
      id: 31, 
      name: "CONCACAF Gold Cup", 
      nameAr: "كونكاكاف جولد كب", 
      href: "concacaf-gold-cup", 
      emblem: "/img/leagues/concacaf.png" 
    },
    { 
      id: 32, 
      name: "Copa América", 
      nameAr: "كوبا أمريكا", 
      href: "copa-america", 
      emblem: "/img/leagues/copa_america.png" 
    },
    { 
      id: 33, 
      name: "AFC Asian Cup", 
      nameAr: "كأس آسيا", 
      href: "afc-asian-cup", 
      emblem: "/img/leagues/afc_asia.png" 
    },
    


  ];

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-12 h-12 text-yellow-400" />
          الدوريات العالمية
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          اختر الدوري للانتقال إلى صفحته الرسمية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Leagues.map((league, index) => (
          <a
            key={league.id}
            href={`https://www.google.com/search?q=${encodeURIComponent(league.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-slate-600 hover:border-blue-400"
          >
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 h-56 sm:h-64 flex items-center justify-center overflow-hidden backdrop-blur-sm">
              {!imageErrors[index] ? (
                <img
                  src={league.emblem}
                  alt={league.name}
                  className="w-32 sm:w-40 h-32 sm:h-40 object-contain relative z-10 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-32 sm:w-40 h-32 sm:h-40 flex items-center justify-center">
                  <Trophy className="w-20 sm:w-24 h-20 sm:h-24 text-blue-400 drop-shadow-2xl" />
                </div>
              )}
            </div>

            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
              <h3 className="text-white text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {league.nameAr}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm text-center mb-2 sm:mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {league.name}
              </p>
              <div className="flex justify-center">
                <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 shadow-lg">
                  <span className="text-white text-xs sm:text-sm font-medium">عرض التفاصيل</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);
}