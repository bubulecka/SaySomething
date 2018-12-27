import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthToken } from './auth-token';
import { AvailableToken } from './available-token';
import { ProfileToken } from '../private/profile/profile-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cacheProfile(token: AuthToken) {
    localStorage.setItem("username",token.profile.username);
    localStorage.setItem("img_link",token.profile.img_link);
    localStorage.setItem("profile-token",JSON.stringify(token.profile));
  }

  getCachedProfile(): ProfileToken {
    return JSON.parse(localStorage.getItem("profile-token"));
  }

  getUsername(): string {
    return localStorage.getItem("username");
  }

  getProfilePic(): string {
    return localStorage.getItem("img_link");
  }

  getLoggedInState():boolean {
    return !!localStorage.getItem("auth");
  }

  setLoggedInState() {
    localStorage.setItem("auth", "ok");
  }

  removeSessionState() {
    //localStorage.clear(); // this would clear space data
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("img_link");
    localStorage.removeItem("profile-token");
  }

  constructor(private http: HttpClient) { }

  checkAvailableUsername = (user: string): Promise<boolean> =>
  {
    // prep request
    let body = new FormData();
    body.append("username", user);

    let promise = new Promise<boolean>((resolve, reject) => {
        this.http.post('http://localhost/backend-demo/auth_check_username.php', body, {withCredentials: true})
        .toPromise()
        .then(
          (response) => {
            let answer = response as AvailableToken;
            if (answer.available == true) {
              resolve(answer.available);
            }
            else {
              reject(answer.message);
            }
          },
          (error) => {
            reject("Something went wrong. Try again?");
          }
        )
        .catch((e: HttpErrorResponse) => {
          console.log("No connection to the server detected?");
        });
    });
    return promise;
  }

  doLogin = (user: string, pass: string): Promise<AuthToken> => 
  {
    // prep request
    let body = new FormData();
    body.append("username", user);
    body.append("password", pass);

    let promise = new Promise<AuthToken>((resolve, reject) => {
        this.http.post('http://localhost/backend-demo/auth_login.php', body, {withCredentials: true})
        .toPromise()
        .then(
          (response) => {
            let answer = response as AuthToken;
            if (answer.auth == true) {
              this.setLoggedInState();
              this.cacheProfile(answer);
            }
            resolve(answer);
          },
          (error) => {reject("Something went wrong. Try again?")}
        )
        .catch((e: HttpErrorResponse) => {
          console.log("No connection to the server detected?");
        });
    });
    return promise;
  }

  doRegister = (user: string, pass: string) : Promise<AuthToken> => 
  {
    // prep request
    let body = new FormData();
    body.append("username", user)
    body.append("password", pass);

    let promise = new Promise<AuthToken>( (resolve, reject) => {
      this.http.post('http://localhost/backend-demo/auth_register.php', body, {withCredentials: true})
      .toPromise()
      .then( 
        (response) => {
          let answer = response as AuthToken;
          if (answer.auth == true) {
            this.setLoggedInState();
            this.cacheProfile(answer);
          }
          resolve(answer);
        }, 
        (error) => {reject("Something went wrong. Try again?")}
      )
      .catch((e: HttpErrorResponse) => {
        console.log("No connection to the server detected?");
      });
    });

    return promise;
  }

  doLogout() : Promise<boolean> {

    // in any case, remove session
    this.removeSessionState();

    let promise = new Promise<boolean>( (resolve, reject) => {
      this.http.post('http://localhost/backend-demo/auth_logout.php', { withCredentials: true })
      .toPromise()
      .then( 
        (response) => {
          var answer = response as AuthToken;
          // there is a problem comparing (answer.auth == false) => false
          // same with (let, var)
          // instead use (answer.auth != true) => true
          resolve(answer.auth);
        },
        (error) => {reject("Something went wrong. Try again?")}
      )
      .catch((e: HttpErrorResponse) => {
        console.log("No connection to the server detected?");
      });
    });

    return promise;
  }
}

//const options = { params: new HttpParams() };
//options.params.set('Content-Type','application/x-www-form-urlencoded');