import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { Router } from '@angular/router';
import { Funcionario } from '../funcionario.model';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css']
})
export class FuncionarioCreateComponent implements OnInit {

  funcionario: Funcionario = {
    funNome: '',
    funCPF:'',
    funCargo:'',
    funTelefone:'',
  }

  //importando funcionarioService
  constructor(private funcionarioService: FuncionarioService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }
 cpfFormatado: string = '';
onCpfInput(event: any): void {
  let valor = event.target.value;

  // Remove tudo que não for número
  valor = valor.replace(/\D/g, '');

  // Limita a 11 números (CPF)
  if (valor.length > 11) {
    valor = valor.substring(0, 11);
  }

  // Formata colocando pontos e traço
  if (valor.length > 9) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
  } else if (valor.length > 3) {
    valor = valor.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
  }
this.cpfFormatado = valor;
}

//Responsavel por formatar um padrao de caracteres para o telefone
telefoneFormatado: string = '';
onTelefoneInput(event: any): void {
  let valor = event.target.value;

  // Remove tudo que não for número
  valor = valor.replace(/\D/g, '');

  // Limita a 11 dígitos
  if (valor.length > 11) {
    valor = valor.substring(0, 11);
  }

  // Formata com parênteses, espaço e hífen
  if (valor.length > 6) {
    // celular com 9 dígitos
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  } else if (valor.length > 2) {
    // fixo ou celular com menos dígitos ainda
    valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    // apenas DDD
    valor = valor.replace(/^(\d{0,2})/, '($1');
  }

  this.telefoneFormatado = valor;
}


  createFuncionario(): void {
    if (!this.funcionario.funNome || !this.funcionario.funCPF || !this.funcionario.funCargo || !this.funcionario.funTelefone) {
    alert('🚨 Preencha todos os campos obrigatórios!(*)');
    return;
  }

  if (this.funcionario.funNome.length > 50) {
    this.funcionarioService.showMessage('Total de letras permitidas no nome: 50');
    return;
  }

  if (this.funcionario.funCPF.length < 14) {
    this.funcionarioService.showMessage('O CPF inserido não é válido. Por favor, revise os dados.');
    return;
  }

  if (this.funcionario.funTelefone.length < 15) {
    this.funcionarioService.showMessage('Número de telefone inválido.');
    return;
  }

  if (this.funcionario.funCargo.length > 50) {
    this.funcionarioService.showMessage('O cargo não pode exceder 50 caracteres.');
    return;
  }

    this.funcionarioService.create(this.funcionario).subscribe(() => {
      this.funcionarioService.showMessage('Funcionario criado!')
      this.router.navigate(['/funcionarios'])
    })
}

  cancel(): void {
    this.router.navigate(['/funcionarios'])
  }  

}
