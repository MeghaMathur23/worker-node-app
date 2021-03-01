export const USER_EMAIL = 'random@test.com';

export const addHeaders = (request: any) =>
  request.set('Content-Type', 'application/json').timeout(2000);
