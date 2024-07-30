export interface SampleDetail {
  detailId: number;
  seriesNumber: string;
  topicNumber: string;
  uniqueSampleNumber: string;
  insideSamplingLocation: string;
  contaminantId: number;
  workerExamined: string;
  environmentalConditions: string;
  sampleVolumeFlowRate: string;
  adjustmentMethodId: number;
  startTime: string; // Using string for time representation
  endTime: string; // Using string for time representation
  samplingTypeId: number;
}
