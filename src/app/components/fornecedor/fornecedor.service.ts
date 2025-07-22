import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando matSnackBar
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor.model';

@Injectable({
  providedIn: 'root'
})

export class FornecedorService {

  baseUrl = "http://localhost:8080/fornecedores"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor)
  }

  read(): Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.baseUrl)
  }

  readById(forId: string): Observable<Fornecedor>{
    const url = `${this.baseUrl}/${forId}`
    return this.http.get<Fornecedor>(url)
  }
 
  update(fornecedor: Fornecedor): Observable<Fornecedor>{
    const url = `${this.baseUrl}/${fornecedor.forId}`
    return this.http.put<Fornecedor>(url, fornecedor)
  }
  
  delete(forId: number): Observable<Fornecedor>{    
    const url = `${this.baseUrl}/${forId}`
    return this.http.delete<Fornecedor>(url)
  }


}  
