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
}

export interface BootcampForm{
  description: string
  startDate: string
  endDate: string
}

