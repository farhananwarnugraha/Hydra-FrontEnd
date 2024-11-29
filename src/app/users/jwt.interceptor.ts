import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { JwtService } from "./jwt.service";

export const jwtInterceptor : HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken();
  // console.log(token); // Untuk memastikan token sudah benar

  // const request = req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${token}`)
  // });

  const request = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}`} : {})
    }
  });

  return next(request);
}
