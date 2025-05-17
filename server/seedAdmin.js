import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './modals/User.js';

dotenv.config();

const admins = [
  { username: 'Admin1', email: 'admin1@example.com', password: 'Admin1234' },
  { username: 'Admin2', email: 'admin2@example.com', password: 'Admin5678' },
  { username: 'Admin3', email: 'admin3@example.com', password: 'Admin9012' },
];

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    for (const adminData of admins) {
      const existing = await User.findOne({ email: adminData.email });
      if (existing) {
        console.log(`⚠️ Admin with email ${adminData.email} already exists. Skipping.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      const admin = new User({
        username: adminData.username,
        email: adminData.email,
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log(`✅ Admin user ${adminData.email} created!`);
    }

    process.exit();
  } catch (err) {
    console.error('❌ Error creating admins:', err);
    process.exit(1);
  }
};

seedAdmins();
