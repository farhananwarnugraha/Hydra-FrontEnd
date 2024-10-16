export interface ResponseCandidate<T>{
  message:string
  status:string
  data:T
}

export interface Candidate{
  candidateId: number,
  fullName: string,
  batchBootcamp: number,
  contactCandidate: string;
  domicile: string;
}
