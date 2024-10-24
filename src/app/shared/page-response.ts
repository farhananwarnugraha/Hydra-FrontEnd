import { Candidate } from "../candidates/candidates.model"

export interface PageResponse<T>{
  message:string
  status:string
  data:{
    "candidates": T[],
    "paginations":{
      "pageNumber": 1,
      "pageSize": 10,
      "totalRows": 41,
      "totalPage": 1
    }
  }
}

export interface PageResponseDinamis<T>{
  status: string;
  message: string;
  data: T;
}

export interface PaginationResponse{
  pageNumber: number;
  pageSize: number;
  totalRows: number;
  totalPage: number;
}
