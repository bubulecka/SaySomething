import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApodToken } from './apod-token';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  
  cacheSpaceData(token: ApodToken): void {
    console.log("cacheSpaceData()");
    let d1 = new Date(token.date+"Z");
    let expires = d1.getTime() + 24*60*60*1000;
    localStorage.setItem("spaceday",expires.toString());
    localStorage.setItem("spacetoken", JSON.stringify(token));
    console.log("cached " + expires);
  }

  checkCachedSpaceData() : boolean {
    console.log("checkCachedSpaceData()");
    if (!!localStorage.getItem("spaceday"))
    {
      let d1 = new Date().getTime().toString();
      console.log("cache state: now="+d1+", expires="+localStorage.getItem("spaceday"));
      if (d1 < localStorage.getItem("spaceday"))
      {
        console.log("cache not expired");
        return true;
      }
      else
      {
        console.log("cache expired");
        return false;
      }
    }
    else {
      console.log("checkCachedSpaceData() returning false");
      return false;
    }
  }

  constructor(private http: HttpClient) { }

  getSpaceData(): Promise<ApodToken> {

    let promise = new Promise<ApodToken>((resolve, reject) => {

      if (this.checkCachedSpaceData() == true) {
        console.log("check says ok, returning cached spacetoken");
        resolve(JSON.parse( localStorage.getItem('spacetoken') ) as ApodToken);
      }
      else {
        this.http.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
        .toPromise()
        .then(
          (response) => { 
            console.log("got in response: "+JSON.stringify(response));
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