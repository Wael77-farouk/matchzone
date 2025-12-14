import Link from 'next/link'
import Image from 'next/image'

type LinkProps = {
  href: string
  name: string
  src: string
}

const LinkSide = ({ href, name, src }: LinkProps) => {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-3
        px-3 py-2.5
        rounded-md
        transition
        hover:bg-[rgb(54,63,78)]
        active:bg-[rgb(54,63,78)]
      "
    >
      <Image
        src={src}
        alt={name}
        width={20}
        height={20}
        className="shrink-0"
      />

      <p className="
        text-xs sm:text-sm
        truncate
        whitespace-nowrap
      ">
        {name}
      </p>
    </Link>
  )
}

export default LinkSide
