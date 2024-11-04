import { PaginationResponse } from "../../shared/page-response"

export interface Candidate{
  candidateId: number,
  fullName: string,
  batchBootcamp: number,
  contactCandidate: string,
  domicile: string
}

// export interface CandidateById{
//   "candidateId": 1,
//   "bootcampClass": 1,
//   "firstName": "Arta",
//   "lastName": "Widodo",
//   "gender": "M",
//   "birthDate": "1998-01-31T00:00:00",
//   "address": "Jl P Tubagus Angke 29, Dki Jakarta",
//   "domicile": "Dki Jakarta",
//   phoneNumber: string,
//   isActive: boolean
// }
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
