import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: 'root'
})
export class BandasService {
	headers = new HttpHeaders({'Access-Control-Allow-Origin':'*',
  'cache-control':'no-cache',
  'server':'Apache/2.4.18 (Ubuntu)',
  'x-ratelimit-limit':'60',
  'x-ratelimit-remaining':'59'})
private basePath:string = path.path

constructor(private http:HttpClient){

}

private handleError(error:any):Promise<any> {
console.error("ha ocurrido un error")
console.log(error)
return Promise.reject(error.message || error)
}

    getAll():Promise<any> {
    let url = `${this.basePath}/api/bandas`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }



    getUsersById(id:string):Promise<any> {
      let url = `${this.basePath}/api/facebook/${id}/users`
        return this.http.get(url)
                        .toPromise()
                          .then(response => {
                            //console.log(response)
                            return response
                          })
                          .catch(this.handleError)
      }


    getAllMine(id):Promise<any> {
    let url = `${this.basePath}/api/filter/0/bandas/${id}?filter=usuario`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    getAllFilter(data):Promise<any> {
    let filter = data.filter?"?filter="+data.filter:"";
    let url = `${this.basePath}/api/filter/${data.id}/bandaseventos/${data.state}${filter}`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    create(form):Promise<any> {
    let url = `${this.basePath}/api/bandas`
      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    votar(form):Promise<any> {
      let url = `${this.basePath}/api/votar`
        return this.http.post(url,form)
                        .toPromise()
                          .then(response => {
                            //console.log(response)
                            return response
                          })
                          .catch(this.handleError)
      }

    delete(id):Promise<any> {
    let url = `${this.basePath}/api/bandas/${id}`
      return this.http.delete(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    update(form):Promise<any> {
    let url = `${this.basePath}/api/bandas/${form.id}`
      return this.http.put(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/api/bandaseventos/${id}`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

}
