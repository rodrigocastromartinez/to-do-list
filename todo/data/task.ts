import { ObjectId } from 'mongodb';
import connectToDatabase from './db'; // Suponiendo que tienes un archivo 'db.ts' para establecer la conexión a la base de datos

interface Task {
  _id: ObjectId;
  title: string;
  complete: boolean;
  // Otros campos de la tarea
}