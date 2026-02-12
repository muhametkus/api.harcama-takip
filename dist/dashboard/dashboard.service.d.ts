import { PrismaService } from '../prisma/prisma.service';
type WeeklyStatus = 'SAFE' | 'WARNING' | 'EXCEEDED';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(): Promise<{
        totalDebt: string;
        totalLimit: string;
        usageRate: string;
        totalAssets: string;
        netWorth: string;
        monthlyExpense: string;
        monthlyPayment: string;
        weeklyExpense: string;
        weeklyLimitStatus: {
            weeklySpent: string;
            weeklyLimit: string;
            remaining: string;
            status: WeeklyStatus;
        };
    }>;
    private calculateWeeklyLimitStatus;
}
export {};
