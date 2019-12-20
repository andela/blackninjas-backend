import faker from 'faker';

const id = faker.random.uuid();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();

const profile = {
  provider: 'google-plus',
  id,
  displayName: `${firstName} ${lastName}`,
  name: { familyName: lastName, givenName: firstName },
  emails: [{ value: email, type: 'ACCOUNT' }],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a-/AAuE7mD7hIQTg4_0WvV34It93y5tEeDT87JbKRW5Aln_=s50'
    }
  ],
  _json: {
    id,
    name: { familyName: lastName, givenName: firstName },
    displayName: `${firstName} ${lastName}`,
    image: {
      url: 'https://lh3.googleusercontent.com/a-/AAuE7mD7hIQTg4_0WvV34It93y5tEeDT87JbKRW5Aln_=s50'
    },
    emails: [[Object]],
    domain: 'google.com',
    language: 'en',
    kind: 'plus#person',
    etag: '%EgUCAwolLhoDAQUH'
  }
};
export default profile;
