import { Dayjs } from "dayjs";

export enum EndingConditionType {
  None = "none",
  EndDate = "end_date",
  OccurrencesNumber = "occurrences_number",
}

export enum FrequencyType {
  None = "none",
  Hourly = "hourly",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Annually = "annually",
}

export interface RecurrenceType {
  startDate: Dayjs;
  frequency: FrequencyType;
  numberOfRepetitions?: number;
  weekDaysRepetition: Array<number>;
  endingCondition: EndingConditionType;
  endingOccurrencesNumber?: number;
  endDate?: Dayjs;
  isAllDay: boolean;
  startTime?: Dayjs;
  endTime?: Dayjs;
}

export interface RecurrenceDay {
  key: number;
  title: string;
  symbol: string;
}

export interface Option {
  key: string;
  title: string;
}
