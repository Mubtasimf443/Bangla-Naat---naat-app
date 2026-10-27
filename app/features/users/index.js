export const USERS = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1),
  name: `ব্যবহারকারী ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  role: i === 0 ? 'moderator' : 'user',
  isVerified: i % 4 !== 0,
  isBanned: i % 6 === 5,
}));

export const allUsers = () => USERS;
