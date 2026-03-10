const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Crée une instance de MongoDB en mémoire
let mongoServer;

// Avant tous les tests
before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Test connecté');
});

// Après tous les tests
after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('✅ MongoDB Test déconnecté');
});

// Après chaque test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});