import bcrypt from "bcryptjs";
import { db } from './index';
import { pool } from './index';
import { users } from './schema';

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    await db.insert(users).values([
      {
        name: 'Deniz Sevinç',
        email: 'denizsevinc343@gmail.com',
        password: hashedPassword,
        role: 'admin',
      }
    ]);
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await pool.end();
  }
}

seed();  