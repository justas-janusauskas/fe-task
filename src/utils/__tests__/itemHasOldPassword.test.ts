import itemHasOldPassword from '../itemHasOldPassword';

const currentTime = new Date()

const items = [
  {
     "id": "000",
     "title": "discord",
     "description": "rumors",
     "password": "discordPassword123.",
     "createdAt": new Date().toISOString()
  },
  {
     "id": "001",
     "title": "airdroid",
     "description": "replace android",
     "password": "pass1",
     "createdAt": new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
  },
  {
     "id": "010",
     "title": "Nintendo",
     "description": "Lets play",
     "password": "pass1",
     "createdAt": new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString()
  }
]

test('should return true if password is older than 30 days', () => {
  expect(itemHasOldPassword(items[0], currentTime)).toBe(false);
  expect(itemHasOldPassword(items[1], currentTime)).toBe(true);
  expect(itemHasOldPassword(items[2], currentTime)).toBe(true);
});