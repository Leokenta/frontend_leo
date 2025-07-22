import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.css']
})
export class FuncionarioDeleteComponent implements OnInit {

  funcionario!: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const funId = this.route.snapshot.paramMap.get('funId');
    this.funcionarioService.readById(funId!).subscribe(funcionario =>{
      this.funcionario = funcionario
    })
  }

  deleteFuncionario(): void {
    this.funcionarioService.delete(this.funcionario.funId!).subscribe(() =>{
    this.funcionarioService.showMessage('Funcionario excluido com sucesso!')  
    this.router.navigate(['/funcionarios'])
    })
  }

  cancel(): void{
    this.router.navigate(['/funcionarios'])
  }

}
