import getListingById from '@/actions/getListingById'
import getCurrentUser from '@/actions/getCurrentUser'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/actions/getReservations'

interface IParams {
  listingId?: string
}

const page = async ({params}: {params: IParams}) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }
  return (
    <div>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  )
}

export default page