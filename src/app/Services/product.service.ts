import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';



@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5256/api/products';

  constructor(private http: HttpClient) {}

  getProducts(search: string, categoryId: string, page: number, pageSize: number): Observable<Product[]> {
    let params = new HttpParams()
      .set('name', search)
      .set('categoryId', categoryId)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getmyProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}