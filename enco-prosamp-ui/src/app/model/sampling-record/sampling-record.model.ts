import {Equipment} from "../equipment/equipment.model";
import {LocationOfSampling} from "../locationofsampling/locationofsampling.model";
import {User} from "../user/user.model";
import {Contaminant} from "../contaminant/contaminant.model";
import {SampleDetail} from "../sample-detail/sample-detail.model";


export interface SamplingRecord {
  samplingRecordId: number;
  sampleDate: string;
  conductedBy: User;
  location: LocationOfSampling;
  contaminants: Contaminant[];
  testedPlant: string;
  technology: string;
  numShiftsShiftDuration: string;
  numWorkersPerShift: number;
  exposureDuration: number;
  temperature: number;
  humidity: number;
  wind: string;
  pressure1: number;
  pressure2: number;
  otherEnvironmentalConditions: string;
  airFlowConditions: string;
  operationMode: string;
  operationBreak: string;
  localAirExtraction: string;
  equipmentList: Equipment[];
  sampleDetailList: SampleDetail[];
  createdAt: string;
  updatedAt: string | null;
  createdBy: User;
  updatedBy: User | null;
}
