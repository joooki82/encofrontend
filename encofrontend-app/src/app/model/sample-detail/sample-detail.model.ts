import { Decimal } from 'decimal.js';
import {Contaminant} from "../contaminant/contaminant.model";

export interface AdjustmentMethod {
  id: number;
  code: string;
  description: string;
}

export interface SamplingType {
  id: number;
  code: string;
  description: string;
}

export interface SampleDetail {
  detailId: number;
  seriesNumber: string;
  topicNumber: string;
  uniqueSampleNumber: string;
  insideSamplingLocation: string;
  contaminants: Contaminant[];
  workerExamined: string;
  temperature: number;
  humidity: number;
  pressure: number;
  sampleVolumeFlowRate: string;
  adjustmentMethod: AdjustmentMethod;
  startTime: Date;
  endTime: Date;
  samplingType: SamplingType;
}

