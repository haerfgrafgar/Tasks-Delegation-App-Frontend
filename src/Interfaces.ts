export interface Work {
  id: number;
  execId: string;
  cordId: string;
  finished: boolean;
  terminated: boolean;
  creationDate: Date;
  startDate?: Date | null;
  dueDate?: Date | null;
  approved?: boolean;
  description: string;
  title: string;
  wasLate: boolean;
  execResponse?: string;
  cordResponse?: string;
  previousWorkVersionId: number;
  deletedByExec?: Date | null;
  secondsTaken: number;
  inProgressNow: boolean;
  priority: number;
}

export interface CalendarWorkDto {
  event_id: number;
  title: string;
  start: Date;
  end: Date;
}

export interface CreateWorkRequestDto {
  ExecUsername: string;
  Description: string;
  Title: string;
  Priority: number; // Must be between 1 and 10
  DueDate: Date;
  StartDate: Date;
}

export interface CorrigirWorkDto {
  Aprovado: boolean;
  Motivo?: string;
}

export interface FractionOfTime {
  id: number;
  appUserId: string;
  workId: number;
  begin: Date;
  end: Date;
}

export interface GeneralSituationResponseDto {
  username: string;
  workTitle: string;
  worksAmount: number;
  totalTimeInTask: number;
  currentTimeInTask: number;
  dueDate?: Date;
}

export interface TokenPayload {
  email: string;
  given_name: string;
  role: string;
  exp: number;
}

export interface HoursMinutesSeconds {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface userObj {
  userId: string;
  userName: string;
}

export interface TimeRangeDto {
  dateStart: Date;
  dateEnd: Date;
}
