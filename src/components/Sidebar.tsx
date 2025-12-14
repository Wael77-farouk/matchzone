import { FC } from "react";
import LinkSide from "./LinkSide";

const Leagues = [
  // الدوريات الأوروبية الكبرى
  { 
    id: 1, 
    name: "Premier League", 
    href: "premier-league", 
    emblem: "/img/leagues/Premier.png" 
  },
  { 
    id: 2, 
    name: "La Liga", 
    href: "la-liga", 
    emblem: "/img/leagues/الدوري الاسباني.png" 
  },
  { 
    id: 3, 
    name: "Bundesliga", 
    href: "bundesliga", 
    emblem: "/img/leagues/bundesliga.webp" 
  },
  { 
    id: 4, 
    name: "Serie A", 
    href: "serie-a", 
    emblem: "/img/leagues/serie_a.webp" 
  },
  { 
    id: 5, 
    name: "Ligue 1", 
    href: "ligue-1", 
    emblem: "/img/leagues/ligue_1.webp" 
  },
  { 
    id: 6, 
    name: "Eredivisie", 
    href: "Eredivisie", 
    emblem: "/img/leagues/شعار الدوري الهولندي.png" 
  },


  // الدوريات الأخرى
  { 
    id: 7, 
    name: "Champions League", 
    href: "champions", 
    emblem: "/img/leagues/Champions League.png" 
  },
  { 
    id: 8, 
    name: "European League", 
    href: "europeanchampionship", 
    emblem: "/img/leagues/شعار الدوري الاوروبي.png" 
  },
  { 
    id: 9, 
    name: "Brazil Serie A", 
    href: "brazilian-series-a", 
    emblem: "/img/leagues/brazilian_serie_a.webp" 
  },
  { 
    id: 10, 
    name: "Copa Libertadores", 
    href: "copa-libertadores", 
    emblem: "/img/leagues/copa_libertadores.webp" 
  },

  // الدوريات العربية
  { 
    id: 11, 
    name: "Egyptian Premier League", 
    href: "egypt-league", 
    emblem: "/img/leagues/Egyptian_Premier_League_logo_2023.png" 
  },
  { 
    id: 12, 
    name: "Saudi Pro League", 
    href: "saudi-league", 
    emblem: "/img/leagues/شعار_دوري_روشن_السعودي.svg" 
  },

  // الدوريات الأمريكية
  { 
    id: 13, 
    name: "Major League Soccer (MLS)", 
    href: "mls", 
    emblem: "/img/leagues/MLS.jfif" 
  },

  // بطولات أفريقيا وآسيا
  { 
    id: 14, 
    name: "CAF Champions League", 
    href: "caf-champions-league", 
    emblem: "/img/leagues/دوري ابطال افريقيا.png" 
  },
  { 
    id: 15, 
    name: "CAF Confederation Cup", 
    href: "caf-cc", 
    emblem: "/img/leagues/CAF Confederation Cup.png" 
  },
  { 
    id: 16, 
    name: "AFC Champions League", 
    href: "afc-champions-league", 
    emblem: "/img/leagues/شعار_دوري_أبطال_آسيا_2021.svg.png" 
  },

  // الكؤوس — إنجلترا
  { 
    id: 17, 
    name: "FA Cup", 
    href: "fa-cup", 
    emblem: "/img/leagues/كاس انجلترا.png " 
  },
  { 
    id: 18, 
    name: "EFL Cup (Carabao Cup)", 
    href: "efl-cup", 
    emblem: "/img/leagues/كاس كاراباو.png" 
  },

  // الكؤوس — إسبانيا
  { 
    id: 19, 
    name: "Copa del Rey", 
    href: "copa-del-rey", 
    emblem: "/img/leagues/Copa_Del_Rey_Official_Logo.png" 
  },
  { 
    id: 20, 
    name: "Supercopa de España", 
    href: "supercopa-espana", 
    emblem: "/img/leagues/شعار_كأس_السوبر_الإسباني (1).svg" 
  },

  // الكؤوس — ألمانيا
  { 
    id: 21, 
    name: "DFB-Pokal", 
    href: "dfb-pokal", 
    emblem: "/img/leagues/كاس المانيا.jfif" 
  },

  // الكؤوس — إيطاليا
  { 
    id: 22, 
    name: "Coppa Italia", 
    href: "coppa-italia", 
    emblem: "/img/leagues/كاس ايطاليا.png" 
  },

  // الكؤوس — فرنسا
  { 
    id: 23, 
    name: "Coupe de France", 
    href: "coupe-de-france", 
    emblem: "/img/leagues/شعاركأس_فرنسا_لكرة_القدم.svg" 
  },

  // كؤوس عربية
  { 
    id: 24, 
    name: "Egypt Cup", 
    href: "egypt-cup", 
    emblem: "/img/leagues/Egyptian_Cup_(football).png" 
  },
  { 
    id: 25, 
    name: "King's Cup (KSA)", 
    href: "saudi-kings-cup", 
    emblem: "/img/leagues/شعار_كأس_خادم_الحرمين_الشريفين_2024.png" 
  },

  { 
    id: 26, 
    name: "Arab Cup 2025", 
    href: "arab-cup-2025", 
    emblem: "/img/leagues/كاس العرب 2025.jfif" 
  },
  { 
    id: 27, 
    name: "FIFA World Cup 2026", 
    href: "worldcup", 
    emblem: "/img/leagues/كاس العالم 2026.jfif" 
  },
  { 
    id: 28, 
    name: "UEFA Euro", 
    href: "uefaeuro", 
    emblem: "/img/leagues/uefa.jpg" 
  },
  { 
    id: 29, 
    name: "Africa Cup of Nations", 
    href: "africacup", 
    emblem: "/img/leagues/2025_Africa_Cup_of_Nations_logo.svg.png" 
  },
  { 
    id: 30, 
    name: "Asia Cup", 
    href: "asiacup", 
    emblem: "/img/leagues/afc_asia.png" 
  },
  { 
    id: 31, 
    name: "Europa Nations League", 
    href: "europanationsleague", 
    emblem: "/img/leagues/nationleague.jpg" 
  },

  //لو حبيت اضيف حاجة تانية
  //{  id: 30, name: "Serie A Logo 2022", href: "serie-a-2022",  emblem: "/img/leagues/Serie_A_logo_2022.svg"}, 
  
   
   
  
];


const QuickLinks = [
  {
    id: 100,
    name: "All Matches Today",
    href: "matches-today",
    emblem: "/img/leagues/All Matchs.JPG",
  }
];

const Sidebar: FC = () => {
  return (
    <aside
      className="
        w-full
        md:w-[260px]
        lg:w-[300px]
        bg-[rgb(40,46,58)]
        rounded-lg
        px-3 sm:px-4
        py-3
        h-fit
      "
    >
      {/* Title */}
      <h1 className="font-bold text-base sm:text-lg md:text-xl mb-3 text-teal-400">
        Leagues & Cups
      </h1>

      {/* Scrollable List on Mobile Only */}
      <ul
        className="
          space-y-1
          max-h-[65vh]
          md:max-h-full
          overflow-y-auto md:overflow-y-visible
          pr-1
          scrollbar-thin
        "
      >
        {Leagues.map((league) => (
          <li key={league.id}>
            <LinkSide
              href={league.href}
              name={league.name}
              src={league.emblem}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
