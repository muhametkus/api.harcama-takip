import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
            status: "SAFE" | "WARNING" | "EXCEEDED";
        };
    }>;
}
