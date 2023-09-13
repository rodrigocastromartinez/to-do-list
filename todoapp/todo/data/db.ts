import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URL;

async function connectToDatabase(): Promise<Db> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');
    return client.db();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

export default connectToDatabase;
