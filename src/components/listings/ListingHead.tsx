'use client'

import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: User | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries()

  const locaction = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${locaction?.region}, ${locaction?.label}`}
      />
      <div
        className='w-full h-[60vh] overflow-hidden rounded-xl relative'
      >
        <Image
          alt='Image'
          src={imageSrc}
          fill
          objectFit='cover'
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead