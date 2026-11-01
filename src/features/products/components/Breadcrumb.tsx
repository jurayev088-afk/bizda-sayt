
'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()

  const pathNames = pathname.split('/').filter(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link
        href="/"
        className="flex items-center text-sm font-normal text-gray-400"
      >
        <span>Bosh sahifa</span>
        {pathNames.length > 0 && <ChevronRight size={18} />}
      </Link>

      {pathNames.map((item, index) => {
        const href = `/${pathNames.slice(0, index + 1).join('/')}`
        const isLast = index === pathNames.length - 1

        return (
          <div key={href} className="flex items-center gap-1">
            <Link
              href={href}
              className={`text-sm font-normal capitalize ${
                isLast
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              {decodeURIComponent(item)}
            </Link>

            {!isLast && <ChevronRight size={18} />}
          </div>
        )
      })}
    </div>
  )
}
