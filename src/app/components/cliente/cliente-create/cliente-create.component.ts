import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    cliNome: '',
    cliCpf:'',
    cliEmail:'',
    cliTelefone:'',
    cliEndRua:'',
    cliEndCidade:'',
    cliEndEstado:'',
    cliEndNum:''
  }

  //importando clienteService
  constructor(private clienteService: ClienteService,
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


  createCliente(): void {
    if (!this.cliente.cliNome || !this.cliente.cliCpf || !this.cliente.cliEmail || !this.cliente.cliTelefone) {
    alert('🚨 Preencha todos os campos obrigatórios!(*)');
    return;
  }

  if (this.cliente.cliNome.length > 50) {
    this.clienteService.showMessage('Total de letras permitidas no nome: 50');
    return;
  }

  if (this.cliente.cliCpf.length > 14) {
    this.clienteService.showMessage('O CPF inserido não é válido. Por favor, revise os dados.');
    return;
  }

  if (this.cliente.cliTelefone.length > 15) {
    this.clienteService.showMessage('Número de telefone inválido: limite máximo de 15 caracteres.');
    return;
  }

  if (this.cliente.cliEmail.length > 100) {
    this.clienteService.showMessage('O endereço de e-mail não pode exceder 100 caracteres.');
    return;
  }

    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!')
      this.router.navigate(['/clientes'])
    })
}

  cancel(): void {
    this.router.navigate(['/clientes'])
  }  

}
