import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApodToken } from './apod-token';

@Injectable({
  providedIn: 'root'
})
// this could be cached on server
export class SpaceService {

  cacheSpaceData(token: ApodToken): void {
    let d1 = new Date(token.date+"Z");
    let expires = d1.getTime() + 24*60*60*1000;
    localStorage.setItem("spaceday",expires.toString());
    localStorage.setItem("spacetoken", JSON.stringify(token));
  }

  checkCachedSpaceData() : boolean {
    if (!!localStorage.getItem("spaceday"))
    {
      let d1 = new Date().getTime().toString();
      return (d1 < localStorage.getItem("spaceday"));
    }
    else {
      return false;
    }
  }

  constructor(private http: HttpClient) { }

  getSpaceData(): Promise<ApodToken> {

    let promise = new Promise<ApodToken>((resolve, reject) => {

      if (this.checkCachedSpaceData() == true) {
        resolve(JSON.parse( localStorage.getItem('spacetoken') ) as ApodToken);
      }
      else {
        this.http.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
        .toPromise()
        .then(
          (response) => {
            this.cacheSpaceData(response as ApodToken);
            resolve(response as ApodToken); 
          },
          (error) => { console.log("Something went wrong while getting apod data"); }
        )
        .catch((e) => {
          console.log("Something went wrong. Check internet connection?");
        });
      }
  });

    return promise;
  }
}