
const tripsData = {
  trip: {
    From: 'kigali',
    To: 'Nairobi',
    reasons: 'staff meeting',
    accomodation: 'marriot hotel',
    travelDate: 2020 - 12 - 30
  },
  returnTrip: {
    From: 1,
    To: 3,
    departureDate: '2020-03-05',
    returnDate: '2020-03-08',
    reasons: 'festive holidays',
    accomodationId: 1
  },
  tripWithWrongDate: {
    From: 1,
    To: 2,
    reasons: 'staff meeting',
    accomodations: 'marriot hotel',
    travelDate: 2022 - 12 - 30,
    returnDate: 2021 - 10 - 15
  },
};
export default tripsData;
