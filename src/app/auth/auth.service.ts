import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthToken } from './auth-token';
import { AvailableToken } from './available-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getLoggedInState():boolean {
    console.log("getLoggedInState()");
    return !!localStorage.getItem("auth");
  }

  setLoggedInState() {
    console.log("setLoggedInState()");
    localStorage.setItem("auth", "ok");
  }

  removeSessionState() {
    console.log("removeSessionState()");
    localStorage.removeItem("auth");
    //localStorage.clear(); // this would clear space data
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
            console.log("Error in checkAvailableUsername: "+error);
            reject("Something went wrong. Try again?");
          }
        )
        .catch((e: HttpErrorResponse) => {
          console.log("No connection to the server detected");
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
            if (answer.auth == true) {this.setLoggedInState();}
            resolve(answer);
          },
          (error) => {reject(error)}
        )
        .catch((e: HttpErrorResponse) => {
          console.log("No connection to the server detected");
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
          if (answer.auth == true) this.setLoggedInState();
          resolve(answer);
        }, 
        (error) => {reject(error)}
      )
      .catch((e: HttpErrorResponse) => {
        console.log("No connection to the server detected");
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
          console.log("logout response: " + JSON.stringify(response));
          var answer = response as AuthToken;
          // there is a problem comparing (answer.auth == false) => false
          // same with (let, var)
          // instead use (answer.auth != true) => true
          resolve(answer.auth);
        },
        (error) => {reject("Something went wrong")}
      )
      .catch((e: HttpErrorResponse) => {
        console.log("No connection to the server detected");
      });
    });

    return promise;
  }
}

//const options = { params: new HttpParams() };
//options.params.set('Content-Type','application/x-www-form-urlencoded');