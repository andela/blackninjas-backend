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
    name: 'marriott',
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
