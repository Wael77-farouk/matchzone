import Image from 'next/image'
import { matchesType } from '@/types'

const Matches = ({ data }: { data: matchesType }) => {
  const getDate = new Date(data?.utcDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="
      grid grid-cols-1
      sm:grid-cols-3
      gap-2 sm:gap-3
      items-center
    ">
      {/* Home Team */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 h-5 relative shrink-0">
          <Image
            src={data?.homeTeam?.crest!}
            alt={data?.homeTeam?.name!}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs sm:text-sm truncate">
          {data?.homeTeam?.name}
        </p>
      </div>

      {/* Score / Time */}
      <div className="flex justify-center">
        <div className="px-3 py-1 bg-slate-600 rounded-md min-w-[60px] text-center">
          {data?.status === 'FINISHED' ? (
            <p className="text-teal-400 text-xs sm:text-sm font-semibold">
              {data?.score?.fullTime.home} : {data?.score?.fullTime.away}
            </p>
          ) : (
            <p className="text-teal-400 text-xs sm:text-sm">
              {getDate}
            </p>
          )}
        </div>
      </div>

      {/* Away Team */}
      <div className="flex items-center justify-end gap-2 min-w-0">
        <p className="text-xs sm:text-sm text-right truncate">
          {data?.awayTeam?.name}
        </p>
        <div className="w-5 h-5 relative shrink-0">
          <Image
            src={data?.awayTeam?.crest!}
            alt={data?.awayTeam?.name!}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Matches
