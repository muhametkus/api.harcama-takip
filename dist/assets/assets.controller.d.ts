import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    findAll(): Promise<{
        type: import(".prisma/client").$Enums.AssetType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    create(dto: CreateAssetDto): Promise<{
        type: import(".prisma/client").$Enums.AssetType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
