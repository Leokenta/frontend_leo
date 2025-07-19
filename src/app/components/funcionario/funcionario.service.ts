import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando matSnackBar
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Funcionario } from './funcionario.model';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  baseUrl = "http://localhost:8080/funcionarios"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(this.baseUrl, funcionario)
  }

  read(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  readById(funId: string): Observable<Funcionario>{
    const url = `${this.baseUrl}/${funId}`
    return this.http.get<Funcionario>(url)
  }
 
  update(funcionario: Funcionario): Observable<Funcionario>{
    const url = `${this.baseUrl}/${funcionario.funId}`
    return this.http.put<Funcionario>(url, funcionario)
  }
  
  delete(funId: number): Observable<Funcionario>{    
    const url = `${this.baseUrl}/${funId}`
    return this.http.delete<Funcionario>(url)
  }


}  
