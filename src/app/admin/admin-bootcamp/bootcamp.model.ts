import { PaginationResponse } from "../../shared/page-response"

export interface BootcampClass {
  bootcampClasses: bootcampClasses[]
  pagination: PaginationResponse
}

export interface bootcampClasses {
  bootcampId: number
  description: string
  startDate: string
  endDate: string
  totalCandidates: number
}

export interface BootcampForm{
  description: string
  startDate: string
  endDate: string
}

export interface BootcampPlaned{
  bootcampId: number,
  description: string,
  startDate: string,
  endDate: string
  totalCandidates: number
}

export interface BootcampPlanedList{
  bootcampsData: BootcampPlaned[],
  pagination: PaginationResponse
}

export interface BootcampActive{
  bootcampId: number,
  description: string,
  startDate: string,
  endDate: string,
  trainerName: string,
  courseName: string
}

export interface BootcampActiveList{
  bootcampsData: BootcampActive[],
  pagination: PaginationResponse
}

export interface BootcampCompleted{
  bootcampsData: bootcampClasses [],
  pagination: PaginationResponse
}

// shedule
export interface ScheduleBootcampActive{
  courseId: string,
  materiBootcamp: string,
  trainerName: string,
  startDate: string,
  endDate: string,
  status: string,
  evaluationDate: string
}
