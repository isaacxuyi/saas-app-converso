"use client"

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import path from 'path'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicParam = searchParams?.get('topic') || ''
  const [searchQuery, setSearchQuery] = useState(topicParam)

  useEffect(() => {
    const delayDeounceFn = setTimeout(() => {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"]
        });

        router.push(newUrl, { scroll: false });
      }

      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDeounceFn);
  }, [searchQuery, router, searchParams, pathname]);


  return (

    
<div className='relative border border-black rounded-md px-3 py-1 flex items-center gap-2 h-fit'>


    <Image src='/icons/search.svg' alt='search' width={16} height={16} />

     

     
    <input
        type='text'
        value={searchQuery}
        placeholder='Search Companions...'
        className='w-full bg-transparent outline-none'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
  </div>
    
  )
}

export default SearchInput
