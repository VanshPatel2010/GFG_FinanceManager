// import { MongoClient, Db } from 'mongodb';

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// export default async function connectToDatabase(): Promise<Db> {
//   if (cachedClient && cachedDb) {
//     return cachedDb;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable in .env.local');
//   }

//   if (!process.env.DB_NAME) {
//     throw new Error('Please define the DB_NAME environment variable in .env.local');
//   }

//   const client = new MongoClient(process.env.MONGODB_URI);

//   await client.connect();
//   const db = client.db(process.env.DB_NAME);

//   cachedClient = client;
//   cachedDb = db;

//   return db;
// }

// import { MongoClient, Db } from 'mongodb';

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// export default async function connectToDatabase(): Promise<Db> {
//   if (cachedClient && cachedDb) {
//     return cachedDb;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable in .env.local');
//   }

//   const client = new MongoClient(process.env.MONGODB_URI);

//   await client.connect();

//   // Automatically retrieve the default database from the URI
//   const db = client.db(); 

//   cachedClient = client;
//   cachedDb = db;

//   return db;
// }

import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}