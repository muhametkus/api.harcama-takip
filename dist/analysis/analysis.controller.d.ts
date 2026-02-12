import { AnalysisService } from './analysis.service';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
    getDebtForecast(): Promise<{
        averageMonthlyDecrease: string;
        estimatedMonthsToFinish: number | null;
        estimatedDebtFreeDate: string | null;
    }>;
}
