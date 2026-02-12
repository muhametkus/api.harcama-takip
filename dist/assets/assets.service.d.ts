import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
export declare class AssetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        type: import(".prisma/client").$Enums.AssetType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
    }[]>;
    create(dto: CreateAssetDto): Promise<{
        type: import(".prisma/client").$Enums.AssetType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
    }>;
}
