const app = require('../../src/app');

describe('\'sponsors\' service', () => {
  it('registered the service', () => {
    const service = app.service('sponsors');
    expect(service).toBeTruthy();
  });
});
