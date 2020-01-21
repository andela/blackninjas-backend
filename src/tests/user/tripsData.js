
const tripsData = {
  trip: {
    From: 1,
    To: 2,
    reason: 'staff meeting',
    accomodationId: 2,
    departureDate: '2020-12-30',
    type: 'one way'
  },
  returnTrip: {
    From: 1,
    To: 2,
    departureDate: '2020-03-05',
    returnDate: '2020-06-08',
    reason: 'festive holidays',
    accomodationId: 2,
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
const multiCityData = [

  {
    From: 1,
    To: 2,
    reason: 'staff meeting',
    accomodationId: 2,
    departureDate: '2020-12-30',
    type: 'multi-city'
  },
  {
    From: 2,
    To: 1,
    reason: 'staff meeting',
    accomodationId: 1,
    departureDate: '2021-12-30',
    type: 'multi-city'
  }
];
const multiCity = [
  {
    From: 1,
    To: 2,
    reason: 'I want to visite that place',
    departureDate: '2101-01-03',
    accomodationId: 2,
    type: 'multi-city'
  },
  {
    From: 2,
    To: 1,
    reason: 'I want to visite that place',
    departureDate: '2101-01-03',
    accomodationId: 1,
    type: 'multi-city'
  },
  {
    From: 1,
    To: 2,
    reason: 'I want to visite that place',
    departureDate: '2109-01-04',
    accomodationId: 2,
    type: 'multi-city'
  }
];
const notMultiCity = [
  {
    From: 1,
    To: 2,
    reason: 'I want to visite that place',
    departureDate: '2101-01-03',
    accomodationId: 2,
    type: 'multi-city'
  }];
export { multiCityData, tripsData, multiCity, notMultiCity };
