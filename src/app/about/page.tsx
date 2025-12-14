import { Flame } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen bg-gray-900 text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 text-red-500">
          <Flame size={36} /> About MatchZone
        </h1>
        <p className="text-lg mt-3 text-gray-400">
          Where passion meets performance data.
        </p>
      </header>
      
      <section className="space-y-6">
        <p className="text-xl font-semibold leading-relaxed">
          MatchZone was founded with a single goal: to provide football fans with the most accurate, accessible, and engaging data across the world's most competitive leagues.
        </p>
        
        <h2 className="text-2xl font-bold border-b border-red-500 pb-2 pt-4">Our Vision</h2>
        <p className="text-gray-300">
          We aim to be the definitive source for football analysis, covering not just the major European leagues, but also giving spotlight to the growing passion in the Saudi Pro League and the Egyptian League. We believe that every fan deserves deep insights into their favorite teams and players.
        </p>
        
        <h2 className="text-2xl font-bold border-b border-red-500 pb-2 pt-4">Why MatchZone?</h2>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>**Unbiased Data:** Focusing on raw statistics and historical performance.</li>
          <li>**Global Focus:** Covering major international and regional competitions.</li>
          <li>**Community Driven:** We value fan engagement and discussion around the beautiful game.</li>
        </ul>
      </section>
    </div>
  );
}