import { Module } from '@nestjs/common';
import DatabaseConstructor, { Database as DatabaseType } from 'better-sqlite3';

@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: (): DatabaseType => {
        const db: DatabaseType = new DatabaseConstructor('db.sqlite');

        db.exec(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
          )
        `);

        return db;
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
