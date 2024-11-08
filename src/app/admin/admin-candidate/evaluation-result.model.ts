import { PaginationResponse } from "../../shared/page-response"

export interface EvauationResult{
  fullName: string,
  courseName: string,
  mark: number,
  isPassed: string
}

export interface EvaluationResults{
  evaluationCandidates: EvauationResult[],
  paginations: PaginationResponse
}
