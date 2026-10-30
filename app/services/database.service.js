/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import * as SQLite from 'expo-sqlite';

export const db = await SQLite.openDatabaseAsync(
  'banglanaat.db'
);

export async function initializeNaatTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS naats (
      id TEXT PRIMARY KEY,

      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      author TEXT NOT NULL,

      youtubeUrl TEXT,

      likes INTEGER NOT NULL DEFAULT 0,

      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

}

export async function insertAllNaats(naats = []) {
  if (naats.length === 0) return 0;

  const db = await dbPromise;
  const now = new Date().toISOString();

  const values = naats
    .map(() => '(?, ?, ?, ?, ?, ?, ?, ?)')
    .join(', ');

  const params = naats.flatMap((naat) => [
    naat.title.trim(),
    naat.content,
    naat.category.trim(),
    naat.author.trim(),
    naat.youtubeUrl?.trim() || null,
    naat.likes ?? 0,
    naat.createdAt ?? now,
    naat.updatedAt ?? now,
  ]);

  const result = await db.runAsync(
    `INSERT INTO naats (
      title,
      content,
      category,
      author,
      youtubeUrl,
      likes,
      createdAt,
      updatedAt
    ) VALUES ${values}`,
    ...params
  );
  console.log(result);

  return result.changes;
}

export async function findNaatByTitle(title) {
  return await db.getAllAsync(
    `SELECT * FROM naats
     WHERE title LIKE ?
     ORDER BY title ASC`,
    `%${title}%`
  );
}

export async function findNaatByContent(content) {
  return await db.getAllAsync(
    `SELECT * FROM naats
     WHERE content LIKE ?
     ORDER BY title ASC`,
    `%${content}%`
  );
}