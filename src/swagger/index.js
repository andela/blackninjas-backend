import path from 'path';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad',
      version: '1.0.0',
      description:
        "Barefoot Nomad is an application that will enable its Company Nomads' book their international travel and accommodation globally, easily and conveniently across all the locations/centers where the company has its operation.",
      license: {
        name: 'MIT',
        url: 'https://github.com/andela/blackninjas-backend'
      },
      contact: {
        name: 'Barefoot-nomad',
        url: 'https://github.com/andela/blackninjas-backend',
        email: 'info@barefootnomad.com'
      }
    },
    basePath: '/api/v1',
    servers: [
      {
        url: 'http://localhost:3000/api/v1'
      },
      {
        url: 'https://blackninjas-backend-staging.herokuapp.com'
      }
    ]
  },
  apis: [path.resolve(__dirname, '../routes/*.js')]
};
export default options;
