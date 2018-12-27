import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http' 
import { SearchUsers } from './search-users';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  constructor(private http: HttpClient) { }

  getUsernames = (query: string) : Promise<SearchUsers> => 
  {
    let promise = new Promise<SearchUsers>( (resolve, reject) => 
    {
      this.http.get('http://localhost/backend-demo/users_searchusernames.php?q=' + query/*, {withCredentials: true}*/)
      .toPromise()
      .then( (response) => {
        resolve(response as SearchUsers)
      }, (error) => {
        reject(error)
      })
      .catch((e: HttpErrorResponse) => {reject("Something went wrong")});
    })

    return promise;
  }
}
