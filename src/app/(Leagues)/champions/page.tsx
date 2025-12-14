import { filterLeague } from "@/api";
import LeagueTable from "@/components/LeagueTable";

const ChampionsLeague = async () => {
  const matches = await filterLeague("UEFA Champions League");

  if (!matches || matches.length === 0) {
    return (
      <div className="w-full max-w-[600px] mx-auto p-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            🏆 UEFA Champions League
          </h2>
          <p className="text-slate-400">
            لا توجد مباريات متاحة حالياً لدوري أبطال أوروبا
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🏆 UEFA Champions League</h1>
      <div className="space-y-4">
        {matches.map((data) => (
          <LeagueTable key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ChampionsLeague;