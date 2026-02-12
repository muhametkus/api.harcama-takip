import { PrismaService } from '../prisma/prisma.service';
export declare class AnalysisService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDebtForecast(): Promise<{
        averageMonthlyDecrease: string;
        estimatedMonthsToFinish: number | null;
        estimatedDebtFreeDate: string | null;
    }>;
    private calculateNetDecreaseForMonth;
    private addMonthsToDate;
}
