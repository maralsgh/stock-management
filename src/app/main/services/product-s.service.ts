import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductSService {
  readonly baseUrl :string = environment.baseURI;
  data: Product = {};
  private dataSub = new BehaviorSubject<Product>(this.data);

  constructor(private http: HttpClient) { }


  public get(id: number) : Promise<void | Product>{
    return this.http.get(this.baseUrl + `product/${id}`)
      .toPromise()
      .then(res => this.updateDataSubscription(<Product>res));
  }

  public Refill(id: number, amount: number): Promise<void | Product>{
    return this.http.put(this.baseUrl + `product/${id}/refill?amount=${amount}` , []).toPromise();
  }

  public buy(id: number, amount: number): Promise<void | Product>{
    return this.http.put(this.baseUrl + `product/${id}/buy?amount=${amount}` , []).toPromise();
  }

  getProductSubscription() {
    return this.dataSub.asObservable();
  }

  updateDataSubscription(newProduct: Product){
    this.dataSub.next(newProduct)
  }

}
