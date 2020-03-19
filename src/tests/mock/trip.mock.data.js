import EncryptPassword from '../../helpers/Encryptor';
import GenerateToken from '../../helpers/token.helper';

const token = GenerateToken({ email: 'multicity@gmail.com', isVerified: 'true' });
const token2 = GenerateToken({ email: 'linemanager@gmail.com', isVerified: 'true' });

const multiCity = [
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2101-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2109-01-04',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2200-01-03',
      accomodationId: 300,
      type: 'multi-city'
    },
    {
      From: 300,
      To: 400,
      reason: 'I want to visite that place',
      departureDate: '2100-01-04',
      accomodationId: 400,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 100,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2200-01-04',
      accomodationId: 200,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 10,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2200-01-04',
      accomodationId: 20,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 100,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2200-01-04',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2000-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2000-01-03',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2100-01-01',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 0,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2100-01-05',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 'invalid',
      To: 'invalid',
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 'invalid',
      To: 'invalid',
      reason: 'I want to visite that place',
      departureDate: '2100-01-06',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 'invalid',
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: '2100-01-05',
      accomodationId: 'invalid',
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: 'invalid',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 300,
      reason: 'I want to visite that place',
      departureDate: 'invalid',
      accomodationId: 300,
      type: 'multi-city'
    }
  ],
  [
    {
      From: 100,
      To: 200,
      reason: 'I want to visite that place',
      departureDate: '2100-01-03',
      accomodationId: 200,
      type: 'multi-city'
    },
    {
      From: 200,
      To: 0,
      reason: 'I want to visite that place',
      departureDate: '2100-01-05',
      accomodationId: 300,
      type: 'multi-city'
    }
  ]
];

const UserDatabaseData = [

  {
    id: 11,
    firstName: 'shema',
    lastName: 'eric',
    isVerified: 'true',
    email: 'multicity@gmail.com',
    password: EncryptPassword('userpassword'),
    token
  },
  {
    id: 12,
    firstName: 'manager',
    lastName: 'eric',
    isVerified: 'true',
    email: 'linemanager@gmail.com',
    password: EncryptPassword('userpassword'),
    token: token2
  },
  {
    id: 13,
    firstName: 'manager',
    lastName: 'eric',
    isVerified: 'true',
    email: 'user@gmail.com',
    password: EncryptPassword('userpassword'),
  }
];

const userManagementDatabaseData = [
  {
    userId: 11,
    managerId: 12
  },
  {
    userId: 13,
    managerId: 12
  }
];

const locationDatabaseData = [
  {
    id: 100,
    city: 'kigali',
    country: 'rwanda',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 200,
    city: 'kampala',
    country: 'uganda',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 300,
    city: 'nairobi',
    country: 'kenya',
    longitude: 0.4545,
    latitude: 0.4564
  }, {
    id: 400,
    city: 'logos',
    country: 'nigeria',
    longitude: 0.4545,
    latitude: 0.4564
  }

];

const accomodationDatabaseData = [
  {
    id: 100,
    name: 'radison',
    description: '',
    locationId: 100,
    category: 'hotel',
    owner: '',
    image: ''
  }, {
    id: 200,
    name: 'raddison blue',
    description: '',
    locationId: 200,
    category: 'hotel',
    owner: '',
    image: ''
  }, {
    id: 300,
    name: 'serena',
    description: '',
    locationId: 300,
    category: 'hotel',
    owner: '',
    image: ''
  },
  {
    id: 400,
    name: 'parkinn',
    description: '',
    locationId: 400,
    category: 'hotel',
    owner: '',
    image: ''
  },
];

const roomDatabaseData = [
  {
    id: 100,
    name: '100',
    accomodationId: 100,
    typeId: 100,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 200,
    name: '200',
    accomodationId: 200,
    typeId: 100,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 300,
    name: '300',
    accomodationId: 300,
    typeId: 100,
    price: 0,
    currency: '',
    status: 'available'
  },
  {
    id: 400,
    name: '400',
    accomodationId: 400,
    typeId: 100,
    price: 0,
    currency: '',
    status: 'booked'
  }
];

const accomodationTypeDatabaseData = [
  {
    id: 100,
    name: 'one bed room'
  }, {
    id: 200,
    name: 'two bed room'
  }, {
    id: 300,
    name: 'shared room'
  }
];

export {
  roomDatabaseData,
  accomodationDatabaseData,
  locationDatabaseData,
  UserDatabaseData,
  multiCity,
  userManagementDatabaseData,
  accomodationTypeDatabaseData
};

export const tripRequests = [
  {
    id: 1,
    lastName: 'eric',
    origin: 'kigali2',
    destination: 'kigali',
    departureDate: '2030-04-12T00:00:00.000Z',
    tripId: 'bec9357e-7352-48f7-b746-d6ed0ed7f634',
    returnDate: null,
    createdAt: '2020-01-22T15:29:17.630Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '2030-03-12T00:00:00.000Z',
    tripId: 'bec9357e-7352-48f7-b746-d6ed0ed7f634',
    returnDate: null,
    createdAt: '2020-01-22T15:29:17.630Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali2',
    destination: 'kigali',
    departureDate: '2030-02-12T00:00:00.000Z',
    tripId: 'e9992289-0afc-43cf-a386-0c60b3e7932d',
    returnDate: null,
    createdAt: '2020-01-22T15:26:49.940Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '2030-01-12T00:00:00.000Z',
    tripId: 'e9992289-0afc-43cf-a386-0c60b3e7932d',
    returnDate: null,
    createdAt: '2020-01-22T15:26:49.939Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '1700-01-12T00:00:00.000Z',
    tripId: 'd944eabe-3166-4cc7-820e-f51b3e20f766',
    returnDate: null,
    createdAt: '2020-01-17T07:38:01.133Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '1900-01-12T00:00:00.000Z',
    tripId: 'a3e3bf08-d795-429e-a298-a5b9388a8f42',
    returnDate: null,
    createdAt: '2020-01-17T07:31:35.033Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '2000-01-12T00:00:00.000Z',
    tripId: 'b80c075d-29b3-460b-91f0-83af2b27e700',
    returnDate: null,
    createdAt: '2020-01-17T07:30:40.251Z',
    name: 'radison',
    status: 'pending'
  },
  {
    id: 1,
    firstName: 'mukunzi',
    lastName: 'eric',
    origin: 'kigali',
    destination: 'kigali2',
    departureDate: '2070-01-12T00:00:00.000Z',
    tripId: '8726d784-586c-4ad3-a9ab-2173d975f15d',
    returnDate: '0434-03-03T21:49:40.000Z',
    createdAt: '2020-01-16T16:53:25.348Z',
    name: 'radison',
    status: 'approved'
  }
];

export const managerInfo = {
  id: 1,
  firstName: 'shema',
  lastName: 'eric',
  country: 'rwanda',
  gender: 'male',
  birthdate: null,
  isVerified: true,
  email: 'shemaerc@gmail.com',
  password: '$2b$10$/1hdxOSDDBghFM1G/C0ejOB/lQfAAfzCu9YlEVGc59eve2sDAoTju',
  preferredlanguage: 'kigali',
  preferredcurrency: 'kinyarwanda',
  place: 'jjjjj',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoic2hlbWFlcmNAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjEsInJvbGUiOiJtYW5hZ2VyIn0sImlhdCI6MTU4NDU1MTg5MCwiZXhwIjoxNTg0NjM4MjkwfQ.7gCPsBBapyKe44FVD8noE1MaRKP1MG2nfRrRba8axGk',
  department: 'BIT',
  profileImage: null,
  role: 'manager',
  authtype: null,
  appNotification: true,
  emailNotification: true,
  createdAt: '2020-01-16T11:47:29.837Z',
  updatedAt: '2020-03-18T17:18:10.780Z'
};
