"use client"

import { useState } from "react"
import { matchesType } from "@/types"
import LeagueTable from "./LeagueTable"

type Props = {
  matchesList: matchesType[]
  matchesListFinished: matchesType[]
}

const Status = ({ matchesList, matchesListFinished }: Props) => {
  const [statusMatch, setStatusMatch] = useState<"TODAY" | "FINISHED">("TODAY")

  const activeBtn =
    "bg-teal-400 text-black font-semibold"
  const inactiveBtn =
    "bg-slate-600 text-white"

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-3 md:mb-4">
        <button
          onClick={() => setStatusMatch("TODAY")}
          className={`
            px-3 py-1.5
            text-xs sm:text-sm
            rounded-md
            transition
            ${statusMatch === "TODAY" ? activeBtn : inactiveBtn}
          `}
        >
          Today
        </button>

        <button
          onClick={() => setStatusMatch("FINISHED")}
          className={`
            px-3 py-1.5
            text-xs sm:text-sm
            rounded-md
            transition
            ${statusMatch === "FINISHED" ? activeBtn : inactiveBtn}
          `}
        >
          Finished
        </button>
      </div>

      {/* Matches */}
      <div className="space-y-2">
        {statusMatch === "TODAY" &&
          matchesList
            ?.filter((m) => m.status === "TIMED")
            .map((data) => (
              <LeagueTable key={data.id} data={data} />
            ))}

        {statusMatch === "FINISHED" && (
          <>
            {matchesList
              ?.filter((m) => m.status === "FINISHED")
              .map((data) => (
                <LeagueTable key={data.id} data={data} />
              ))}

            {matchesListFinished?.map((data) => (
              <LeagueTable key={data.id} data={data} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Status
