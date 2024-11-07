export interface InfoUser{
  username:string;
  role:string;
  token:string;
}

export interface LoginCredential{
  username:string;
  password:string
}

export interface Response<T>{
  message:string;
  status:string;
  data:any;
}

export interface RegisterCredential{
  username: string;
  email: string;
  password: string;
  roleIds: number[];
}
