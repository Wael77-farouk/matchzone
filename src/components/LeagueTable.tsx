import Competition from './Competition'
import Matches from './Matches'
import { matchesType } from '@/types'

const LeagueTable = ({ data }: { data: matchesType }) => {
  return (
    <div
      className="
        w-full
        max-w-[900px]
        mx-auto
        mb-3
        rounded-lg
        bg-[rgb(40,46,58)]
        px-3 py-3
        sm:px-4
        md:px-5 md:py-4
        flex flex-col
        gap-3
      "
    >
      <Competition data={data} />
      <Matches data={data} />
    </div>
  )
}

export default LeagueTable
