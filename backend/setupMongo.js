// Script to setup MongoDB database and collections
// This is for development purposes only

const { MongoClient } = require('mongodb');

async function setupDatabase() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Create database
    const database = client.db('cinerate');
    
    // Create users collection
    const usersCollection = database.collection('users');
    
    // Create indexes
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log("Created users collection with indexes");
    
    // Create movies collection
    const moviesCollection = database.collection('movies');
    
    // Create indexes
    await moviesCollection.createIndex({ title: 1 });
    await moviesCollection.createIndex({ genre: 1 });
    await moviesCollection.createIndex({ rating: -1 });
    console.log("Created movies collection with indexes");
    
    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await client.close();
  }
}

// Run the setup
setupDatabase().catch(console.error);