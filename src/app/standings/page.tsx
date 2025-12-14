"use client";
import { useState, useEffect } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

// قائمة الدوريات المتاحة
const availableLeagues = [
  { id: "PL", name: "Premier League", slug: "premier-league" },
  { id: "PD", name: "La Liga", slug: "la-liga" },
  { id: "BL1", name: "Bundesliga", slug: "bundesliga" },
  { id: "SA", name: "Serie A", slug: "serie-a" },
  { id: "FL1", name: "Ligue 1", slug: "ligue-1" },
  { id: "DED", name: "Eredivisie", slug: "Eredivisie" },
  { id: "CL", name: "Champions League", slug: "champions" },
  { id: "PPL", name: "Primeira Liga", slug: "primeira-liga" },
  { id: "ELC", name: "Championship", slug: "championship" },
];

const StandingsPage = () => {
  const [selectedLeague, setSelectedLeague] = useState<any>(null);
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<any>(null);

 // دالة لجلب الترتيب من API Route
  const fetchStandings = async (leagueCode: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Fetching standings for:', leagueCode);
      
      const response = await fetch(`/api/standings/${leagueCode}`);
      
      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        let errorMessage = "Failed to fetch standings";
        
        try {
          const errorData = await response.json();
          console.error('❌ Error data:', errorData);
          errorMessage = errorData.error || errorMessage;
          
          if (errorData.details) {
            console.error('📋 Error details:', errorData.details);
          }
        } catch (e) {
          console.error('❌ Could not parse error response');
        }
        
        if (response.status === 403) {
          throw new Error("This league is not available in your subscription plan");
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Data received successfully');
      
      if (data.standings && data.standings.length > 0) {
        const mainStanding = data.standings.find((s: any) => s.type === "TOTAL") || data.standings[0];
        setStandings(mainStanding.table);
        setLeagueInfo({
          name: data.competition.name,
          emblem: data.competition.emblem,
          season: data.season.startDate.split('-')[0] + "/" + data.season.endDate.split('-')[0]
        });
      } else {
        setStandings([]);
        setError("No standings data available for this league");
      }
    } catch (err: any) {
      console.error('💥 Fetch error:', err);
      setError(err.message);
      setStandings([]);
      setLeagueInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLeagueSelect = (league: any) => {
    setSelectedLeague(league);
    fetchStandings(league.id);
  };

  const getPositionColor = (position: number, total: number) => {
    if (position <= 4) return "bg-blue-500/20 border-l-4 border-blue-500";
    if (position <= 6) return "bg-orange-500/20 border-l-4 border-orange-500";
    if (position > total - 3) return "bg-red-500/20 border-l-4 border-red-500";
    return "bg-transparent";
  };

  const getFormDisplay = (form: string | null) => {
    if (!form) return null;
    return form.split(',').slice(-5).map((result: string, i: number) => (
      <span
        key={i}
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          result === "W"
            ? "bg-green-500"
            : result === "D"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {result}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header - محسّن للموبايل */}
      <div className="bg-[#0b0f16] border-b border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Trophy className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">League Standings</h1>
          </div>
          <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Select a league to view the current standings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* اختيار الدوري - محسّن للموبايل */}
        {!selectedLeague ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {availableLeagues.map((league) => (
              <button
                key={league.id}
                onClick={() => handleLeagueSelect(league)}
                className="bg-[#1a1f2e] hover:bg-[#242938] border border-gray-700 rounded-lg p-4 sm:p-6 text-left transition-all active:scale-95 sm:hover:scale-105 hover:shadow-xl hover:border-teal-500"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Trophy className="text-teal-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-base sm:text-lg font-semibold">{league.name}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            {/* العودة لاختيار دوري آخر */}
            <button
              onClick={() => {
                setSelectedLeague(null);
                setStandings([]);
                setLeagueInfo(null);
              }}
              className="mb-4 sm:mb-6 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors text-sm sm:text-base"
            >
              ← Back to Leagues
            </button>

            {/* عنوان الدوري المحدد */}
            {leagueInfo && (
              <div className="bg-[#1a1f2e] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700">
                <div className="flex items-center gap-3 sm:gap-4">
                  {leagueInfo.emblem && (
                    <img 
                      src={leagueInfo.emblem} 
                      alt={leagueInfo.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
                      {leagueInfo.name}
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm sm:text-base">Season {leagueInfo.season}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-teal-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-400 text-sm sm:text-base">Loading standings...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 sm:p-6 text-center">
                <p className="text-red-400 font-semibold mb-2 text-sm sm:text-base">⚠️ {error}</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {error.includes("subscription") 
                    ? "Some leagues require a paid plan on football-data.org"
                    : "Please check your API configuration"}
                </p>
              </div>
            )}

            {/* جدول الترتيب - محسّن للموبايل */}
            {!loading && !error && standings.length > 0 && (
              <div className="bg-[#1a1f2e] rounded-lg overflow-x-auto border border-gray-700">
                <div className="min-w-[600px]">
                  {/* Header الجدول */}
                  <div className="grid grid-cols-12 gap-2 bg-[#0b0f16] p-3 sm:p-4 font-bold text-xs sm:text-sm border-b border-gray-700">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-3">Team</div>
                    <div className="col-span-1 text-center">P</div>
                    <div className="col-span-1 text-center">W</div>
                    <div className="col-span-1 text-center">D</div>
                    <div className="col-span-1 text-center">L</div>
                    <div className="col-span-1 text-center">GD</div>
                    <div className="col-span-1 text-center font-bold">PTS</div>
                    <div className="col-span-2 text-center">Form</div>
                  </div>

                  {/* صفوف الفرق */}
                  {standings.map((team) => (
                    <div
                      key={team.team.id}
                      className={`grid grid-cols-12 gap-2 p-3 sm:p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${getPositionColor(
                        team.position,
                        standings.length
                      )}`}
                    >
                      <div className="col-span-1 text-center font-bold text-base sm:text-lg">
                        {team.position}
                      </div>

                      <div className="col-span-3 flex items-center gap-2">
                        <img
                          src={team.team.crest}
                          alt={team.team.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                          onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = 'none';
                          }}
                        />
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {team.team.shortName || team.team.name}
                        </span>
                      </div>

                      <div className="col-span-1 text-center text-gray-400 text-xs sm:text-sm">
                        {team.playedGames}
                      </div>

                      <div className="col-span-1 text-center text-green-400 text-xs sm:text-sm">
                        {team.won}
                      </div>

                      <div className="col-span-1 text-center text-yellow-400 text-xs sm:text-sm">
                        {team.draw}
                      </div>

                      <div className="col-span-1 text-center text-red-400 text-xs sm:text-sm">
                        {team.lost}
                      </div>

                      <div className="col-span-1 text-center text-gray-300 text-xs sm:text-sm">
                        {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                      </div>

                      <div className="col-span-1 text-center font-bold text-base sm:text-lg text-teal-400">
                        {team.points}
                      </div>

                      <div className="col-span-2 flex justify-center gap-1">
                        {getFormDisplay(team.form)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legend - محسّن للموبايل */}
            {!loading && !error && standings.length > 0 && (
              <div className="mt-4 sm:mt-6 bg-[#1a1f2e] rounded-lg p-4 sm:p-6 border border-gray-700">
                <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Legend</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
                    <span>Champions League</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded"></div>
                    <span>Europa League</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
                    <span>Relegation</span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    P = Played | W = Won | D = Draw | L = Lost | GD = Goal Difference | PTS = Points
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsPage;