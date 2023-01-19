import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const port = 5000;
const prisma = new PrismaClient();

app.register(cors);

app.get('/', async () => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app.listen({ port }, () => console.log(`Server running on port ${port}!`));
