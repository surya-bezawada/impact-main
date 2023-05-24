import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userSubject: BehaviorSubject<User | null>;
  public userSource: Observable<User | null>;

  constructor(private http:HttpClient,){
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.userSource = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
}

  getArticles(Limit:number,Offset:number):Observable<any>{
      return this.http.get(environment.baseUrl+'articles?limit='+Limit+'&offset='+Offset)
  }

  registration(credentials: {
    username: string;
    email: string;
    password: string;
  }):Observable<{user:User}>{
    return this.http.post<{user:User}>(environment.baseUrl+'users',{user:credentials})

  }

  login(credentials:{
    email: string;
    password: string;

  }):Observable<{user:User}>{
    return this.http.post<{user:User}>(environment.baseUrl+'users/login',{user:credentials}) .pipe(
      tap(response => {
        const token = response.user.token;
        // Store the token in local storage
        localStorage.setItem('token', token);
      })
    );

  }

}
