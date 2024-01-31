import EmptyState from '@/components/EmptyState'
import React from 'react'


import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations";
import TripsClient from './TripsClient';

interface IParams {
  listingId?: string
}

const page = async ({params}: {params: IParams}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    )
  }

  return (
    <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
  )
}

export default page