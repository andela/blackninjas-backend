import EncryptPassword from '../../helpers/Encryptor';
import GenerateToken from '../../helpers/token.helper';

const userToken = GenerateToken({ email: 'user@gmail.com', isVerified: 'true' });
const anauthorizedToken = GenerateToken({ email: 'unauthorized@gmail.com', isVerified: 'true' });
const linemanagerToken = GenerateToken({ email: 'linemanager@gmail.com', isVerified: 'true' });
const comment = [
  {
    id: 12,
    subjectId: 'ubjectId',
    subjectType: 'trip request',
    commentorId: 133,
    comment: 'test test test'
  },
  {
    id: 14,
    subjectId: 'ubjectId',
    subjectType: 'trip request',
    commentorId: 133,
    comment: 'test test test'
  },
  {
    comment: 'new comment'
  }
];

const trip = [
  {
    id: 110,
    tripId: 'tripId',
    originId: 1,
    destinationId: 2,
    reason: 'visite',
    departureDate: '2020-05-01',
    returnDate: '2020-02-06',
    accomodationId: 110,
    tripType: 'one way',
    leavingDays: 1,
    userId: 133
  }, {
    id: 111,
    tripId: 'secondTripId',
    originId: 1,
    destinationId: 2,
    reason: 'visite',
    departureDate: '2030-05-01',
    returnDate: '2030-02-06',
    accomodationId: 110,
    tripType: 'one way',
    leavingDays: 1,
    userId: 111
  }
];

const requestTrip = [
  {
    id: 110,
    userId: 133,
    managerId: 122,
    tripId: 'tripId',
    status: 'pending'
  },
  {
    id: 111,
    userId: 111,
    managerId: 122,
    tripId: 'secondTripId',
    status: 'pending'
  }
];


const UserDatabaseData = [

  {
    id: 111,
    firstName: 'shema',
    lastName: 'eric',
    isVerified: 'true',
    email: 'unauthorized@gmail.com',
    password: EncryptPassword('userpassword'),
    token: anauthorizedToken
  },
  {
    id: 122,
    firstName: 'manager',
    lastName: 'eric',
    isVerified: 'true',
    email: 'linemanager@gmail.com',
    password: EncryptPassword('userpassword'),
    token: linemanagerToken
  },
  {
    id: 133,
    firstName: 'username',
    lastName: 'eric',
    isVerified: 'true',
    email: 'user@gmail.com',
    password: EncryptPassword('userpassword'),
    token: userToken
  }
];

const userManagementDatabaseData = [
  {
    userId: 111,
    managerId: 122
  },
  {
    userId: 133,
    managerId: 122
  }
];

const locationDatabaseData = [
  {
    id: 110,
    city: 'kigali',
    country: 'rwanda',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 210,
    city: 'kampala',
    country: 'uganda',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 310,
    city: 'nairobi',
    country: 'kenya',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 410,
    city: 'logos',
    country: 'nigeria',
    longitude: 0.4545,
    latitude: 0.4564
  }

];

const accomodationDatabaseData = [
  {
    id: 110,
    name: 'marriott',
    description: '',
    locationId: 110,
    category: 'hotel',
    owner: '',
    image: ''
  }, {
    id: 210,
    name: 'raddison blue',
    description: '',
    locationId: 210,
    category: 'hotel',
    owner: '',
    image: ''
  }, {
    id: 310,
    name: 'serena',
    description: '',
    locationId: 310,
    category: 'hotel',
    owner: '',
    image: ''
  },
  {
    id: 410,
    name: 'parkinn',
    description: '',
    locationId: 410,
    category: 'hotel',
    owner: '',
    image: ''
  },
];

const roomDatabaseData = [
  {
    id: 110,
    name: '110',
    accomodationId: 110,
    typeId: 110,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 210,
    name: '210',
    accomodationId: 210,
    typeId: 110,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 310,
    name: '310',
    accomodationId: 310,
    typeId: 110,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 410,
    name: '410',
    accomodationId: 410,
    typeId: 110,
    price: 0,
    currency: '',
    status: 'booked'
  }
];

const accomodationTypeDatabaseData = [
  {
    id: 110,
    name: 'one bed room'
  }, {
    id: 210,
    name: 'two bed room'
  }, {
    id: 310,
    name: 'shared room'
  }
];

export {
  roomDatabaseData,
  accomodationDatabaseData,
  locationDatabaseData,
  UserDatabaseData,
  userManagementDatabaseData,
  accomodationTypeDatabaseData,
  comment, trip, requestTrip
};
