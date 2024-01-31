'use client'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface TripsClientProps {
  reservations: (Reservation & {
    listing: Listing
  })[]
  currentUser: User
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(async (id: string) => {
    setDeletingId(id)

    try {
      await axios.delete(`/api/reservations/${id}`)
      
      toast.success('Reservation canceled!')
      router.refresh()
    } catch (error) {
      toast.error(error as string)
    }

    setDeletingId('')

  }, [router])
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you have neeb and where are you going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient