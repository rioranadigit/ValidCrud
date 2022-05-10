import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postReg(data : any){
    return this.http.post<any>("http://localhost:3000/RegList/",data);
  }

  getReg(){
    return this.http.get<any>("http://localhost:3000/RegList/");
  }
  putReg(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/RegList/"+id,data);
  }
  delReg(id:number){
    return this.http.delete<any>("http://localhost:3000/RegList/"+id);
  }

}
