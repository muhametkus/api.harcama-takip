import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = "postgres://harcamayonetimi:harcamayonetimi123.@45.158.14.222:54399/harcamayonetimi";

    if (!connectionString) {
      throw new Error(
        'Database URL is not defined. Set DATABASE_URL or POSTGRES_PRISMA_URL/POSTGRES_URL.',
      );
    }

    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
