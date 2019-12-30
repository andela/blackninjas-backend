
const tripsData = {
  trip: {
    From: 1,
    To: 3,
    reason: 'staff meeting',
    accomodationId: 1,
    departureDate: '2020-12-30',
    type: 'one way'
  },
  returnTrip: {
    From: 1,
    To: 3,
    departureDate: '2020-03-05',
    returnDate: '2020-03-08',
    reason: 'festive holidays',
    accomodationId: 1,
    type: 'round trip'
  },
  tripWithWrongDate: {
    From: 1,
    To: 2,
    reason: 'staff meeting',
    accomodations: 'marriot hotel',
    departureDate: 2022 - 12 - 30,
    returnDate: 2021 - 10 - 15
  },
  Sametrip: {
    From: 1,
    To: 1,
    departureDate: '2020-03-05',
    reason: 'festive holidays',
    accomodationId: 1
  },
  originFalse: {
    From: 15,
    To: 1,
    departureDate: '2020-03-05',
    reason: 'festive holidays',
    accomodationId: 1
  },
  destinationFalse: {
    From: 1,
    To: 19,
    departureDate: '2020-03-05',
    reason: 'festive holidays',
    accomodationId: 1
  }
};
export default tripsData;
