import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-read',
  templateUrl: './funcionario-read.component.html',
  styleUrls: ['./funcionario-read.component.css']
})
export class FuncionarioReadComponent implements OnInit {

  funcionarios!: Funcionario[];
  funcionariosFiltrados!: Funcionario[];
  filtro: string = '';
  displayedColumns = ['funId', 'funNome', 'funCPF', 'funCargo', 'funTelefone', 'action'];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarioService.read().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
      this.funcionariosFiltrados = funcionarios; // inicializa filtrados com todos
    });
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.funcionariosFiltrados = this.funcionarios.filter(func =>
      func.funNome.toLowerCase().includes(filtroLower)
    );
  }
}
