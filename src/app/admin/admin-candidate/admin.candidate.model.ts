import { PaginationResponse } from "../../shared/page-response"

export interface Candidate{
  candidateId: number,
  fullName: string,
  batchBootcamp: number,
  contactCandidate: string,
  domicile: string
}

export interface Candidates{
  candidates: Candidate[],
  paginations: PaginationResponse
}

export interface AddCandaidateForm{
  bootcampClass: number,
  firstName: string,
  lastName: string,
  gender: string,
  birthDate: string,
  address:string,
  domicile: string,
  phoneNumber: string
}

export interface CandidateForm{
  candidateId: number,
  firstName: string,
  lastName: string,
  bootcampClass: number,
  gender: string,
  birthDate: string,
  address:string,
  domicile: string,
  phoneNumber: string
  isActive: boolean
}
