import { filterLeague } from "@/api";
import LeagueTable from "@/components/LeagueTable";

const Ligue1 = async () => {
  const matches = await filterLeague("Ligue 1");

  if (!matches || matches.length === 0) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-6">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-3">
            🇫🇷 Ligue 1
          </h2>
          <p className="text-slate-400">
            لا توجد مباريات متاحة حالياً للدوري الفرنسي
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🇫🇷 Ligue 1</h1>
      <div className="space-y-4">
        {matches.map((data) => (
          <LeagueTable key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Ligue1;
