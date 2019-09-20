const app = require('../../src/app');

describe('\'speakers\' service', () => {
  it('registered the service', () => {
    const service = app.service('speakers');
    expect(service).toBeTruthy();
  });
});
