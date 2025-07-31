import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando matSnackBar
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  baseUrl = "http://localhost:8080/produtos"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.baseUrl, produto)
  }

  read(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl)
  }

  readById(prodId: string): Observable<Produto>{
    const url = `${this.baseUrl}/${prodId}`
    return this.http.get<Produto>(url)
  }
 
  update(produto: Produto): Observable<Produto>{
    const url = `${this.baseUrl}/${produto.prodId}`
    return this.http.put<Produto>(url, produto)
  }
  
  delete(prodId: number): Observable<Produto>{    
    const url = `${this.baseUrl}/${prodId}`
    return this.http.delete<Produto>(url)
  }


}  
