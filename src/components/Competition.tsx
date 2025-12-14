import { matchesType } from '@/types'
import Image from 'next/image'

const Competition = ({ data }: { data: matchesType }) => {
  const nd = new Date(data?.utcDate)
  const dateConvert = nd.toDateString()

  return (
    <div className="
      mb-3
      flex flex-col sm:flex-row
      sm:justify-between sm:items-center
      gap-2
      px-3 py-2
      bg-slate-600 hover:bg-slate-700
      rounded-md
    ">
      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src={data?.competition.emblem}
          alt={data?.competition.name}
          width={18}
          height={18}
          className="shrink-0"
        />
        <p className="text-xs sm:text-sm text-teal-400 truncate">
          {data?.competition.name}
        </p>
      </div>

      {/* Date */}
      <p className="text-[10px] sm:text-xs md:text-sm text-right text-slate-200">
        {dateConvert}
      </p>
    </div>
  )
}

export default Competition
