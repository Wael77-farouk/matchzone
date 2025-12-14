'use client';
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export default function SportsWebsitesPage() {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const SportsWebsites = [
    { 
      id: 1, 
      name: "Yalla Kora", 
      nameAr: "يلا كورة",
      url: "https://www.yallakora.com", 
      emblem: "/img/websites/yallakora.jpg" 
    },
    { 
      id: 2, 
      name: "FilGoal", 
      nameAr: "في الجول",
      url: "https://www.filgoal.com", 
      emblem: "/img/websites/filgoal.png" 
    },
    { 
      id: 3, 
      name: "beIN SPORTS", 
      nameAr: "بي ان سبورت",
      url: "https://www.beinsports.com", 
      emblem: "/img/websites/beinsports.png" 
    },
    { 
      id: 4, 
      name: "365Scores", 
      nameAr: "365 سكورز",
      url: "https://www.365scores.com", 
      emblem: "/img/websites/365scores.png" 
    },
    { 
      id: 5, 
      name: "ESPN", 
      nameAr: "إي إس بي إن",
      url: "https://www.espn.com", 
      emblem: "/img/websites/espn.png" 
    },
    { 
      id: 6, 
      name: "Goal", 
      nameAr: "جول",
      url: "https://www.goal.com", 
      emblem: "/img/websites/goal.png" 
    },
    { 
      id: 7, 
      name: "Kooora", 
      nameAr: "كووورة",
      url: "https://www.kooora.com", 
      emblem: "/img/websites/kooora.webp" 
    },
    { 
      id: 8, 
      name: "Sky Sports", 
      nameAr: "سكاي سبورتس",
      url: "https://www.skysports.com", 
      emblem: "/img/websites/skysports.JFIF" 
    },
    { 
      id: 9, 
      name: "BBC Sport", 
      nameAr: "بي بي سي سبورت",
      url: "https://www.bbc.com/sport", 
      emblem: "/img/websites/bbcsport.JPG" 
    },
    { 
      id: 10, 
      name: "Marca", 
      nameAr: "ماركا",
      url: "https://www.marca.com", 
      emblem: "/img/websites/marca.webp" 
    },
    { 
      id: 11, 
      name: "AS", 
      nameAr: "آس",
      url: "https://www.as.com", 
      emblem: "/img/websites/as.png" 
    },
    { 
      id: 12, 
      name: "La Gazzetta dello Sport", 
      nameAr: "لاجازيتا",
      url: "https://www.gazzetta.it", 
      emblem: "/img/websites/gazzetta.png" 
    },
    { 
      id: 13, 
      name: "L'Équipe", 
      nameAr: "ليكيب",
      url: "https://www.lequipe.fr", 
      emblem: "/img/websites/lequipe.png" 
    },
    { 
      id: 14, 
      name: "Sport Bild", 
      nameAr: "سبورت بيلد",
      url: "https://sportbild.bild.de", 
      emblem: "/img/websites/sportbild.JPG" 
    },
    { 
      id: 15, 
      name: "Transfermarkt", 
      nameAr: "ترانسفير ماركت",
      url: "https://www.transfermarkt.com", 
      emblem: "/img/websites/transfermarkt.png" 
    },
    { 
      id: 16, 
      name: "FotMob", 
      nameAr: "فوت موب",
      url: "https://www.fotmob.com", 
      emblem: "/img/websites/fotmob.JFIF" 
    },
    { 
      id: 17, 
      name: "SofaScore", 
      nameAr: "سوفا سكور",
      url: "https://www.sofascore.com", 
      emblem: "/img/websites/sofascore.png" 
    },
    { 
      id: 18, 
      name: "FlashScore", 
      nameAr: "فلاش سكور",
      url: "https://www.flashscore.com", 
      emblem: "/img/websites/flashscore.png" 
    },
    { 
      id: 19, 
      name: "OneFootball", 
      nameAr: "ون فوتبول",
      url: "https://www.onefootball.com", 
      emblem: "/img/websites/onefootball.png" 
    },
    { 
      id: 20, 
      name: "The Athletic", 
      nameAr: "ذا أثليتك",
      url: "https://www.theathletic.com", 
      emblem: "/img/websites/theathletic.JPG" 
    },
    { 
      id: 21, 
      name: "Who Scored", 
      nameAr: "هو سكورد",
      url: "https://www.whoscored.com", 
      emblem: "/img/websites/who scored.png" 
    },
    { 
      id: 22, 
      name: "Live Score", 
      nameAr: "لايف سكور",
      url: "https://www.livescore.com", 
      emblem: "/img/websites/live score.JFIF" 
    },
    { 
      id: 23, 
      name: "Sport 360", 
      nameAr: "سبورت 360",
      url: "https://arabic.sport360.com", 
      emblem: "/img/websites/sport360.png" 
    },
    { 
      id: 24, 
      name: "Bleacher Report", 
      nameAr: "بليتشر ريبورت",
      url: "https://bleacherreport.com", 
      emblem: "/img/websites/bleacher.JPG" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Globe className="w-12 h-12 text-blue-400" />
            المواقع الرياضية
          </h1>
          <p className="text-gray-300 text-lg">أشهر المواقع الرياضية العالمية والعربية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SportsWebsites.map((website, index) => (
            <a
              key={website.id}
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-600 hover:border-blue-400"
            >
              {/* التأثيرات */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 h-56 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                {!imageErrors[index] ? (
                  <img
                    src={website.emblem}
                    alt={website.name}
                    className="w-40 h-40 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center">
                    <Globe className="w-24 h-24 text-blue-400 drop-shadow-2xl" />
                  </div>
                )}
              </div>

              <div className="relative p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <h3 className="text-white text-xl font-bold text-center mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {website.nameAr}
                </h3>
                
                <p className="text-gray-400 text-sm text-center mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {website.name}
                </p>

                <div className="flex justify-center">
                  <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 shadow-lg">
                    <span className="text-white text-sm font-medium">زيارة الموقع</span>
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