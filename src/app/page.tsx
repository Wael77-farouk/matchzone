import { getMatchesfootball, getMatchesfootballFinished } from "@/api";
import Status from "@/components/Status";

export default async function Home() {
  const getDatas = await getMatchesfootball();
  const getDatasFinished = await getMatchesfootballFinished();

  const matchesDatas = getDatas?.matches;
  const matchesDatasFinished = getDatasFinished?.matches;

  const nd = new Date();
  const dateConvert = nd.toDateString();

  return (
    <section className="w-full max-w-[800px] mx-auto p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">⚽ MATCHES</h1>

        <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200 text-sm">
          <p>{dateConvert}</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6 shadow-lg">
        <Status
          matchesList={matchesDatas}
          matchesListFinished={matchesDatasFinished}
        />
      </div>
    </section>
  );
}
