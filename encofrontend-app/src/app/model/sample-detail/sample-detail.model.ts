import { Decimal } from 'decimal.js';

export interface SampleDetail {
  detailId: number;
  seriesNumber: string;
  topicNumber: string;
  uniqueSampleNumber: string;
  insideSamplingLocation: string;
  contaminantId: number;
  workerExamined: string;
  temperature: Decimal;
  humidity: Decimal;
  pressure: Decimal;
  sampleVolumeFlowRate: string;
  adjustmentMethodId: number;
  startTime: Date;
  endTime: Date;
  samplingTypeId: number;
}
