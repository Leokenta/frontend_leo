import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
    forNomeFantasia: '',
    forCnpj:'',
    forRazaoSocial:'',
    forTelefone: ''
  }

  //importando fornecedorService
  constructor(private fornecedorService: FornecedorService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }
  cnpjFormatado: string = '';

  onCnpjInput(event: any): void {
    let value = event.target.value;
  
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
  
    // Aplica a máscara passo a passo
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (value.length > 6) {
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (value.length > 10) {
      value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (value.length > 15) {
      value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
  
    // Limita ao tamanho máximo (18 com máscara)
    if (value.length > 18) {
      value = value.substring(0, 18);
    }
  
    event.target.value = value;
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
 
   createFornecedor(): void {
    if (!this.fornecedor.forNomeFantasia || !this.fornecedor.forCnpj || !this.fornecedor.forRazaoSocial || !this.fornecedor.forTelefone) {
    alert('🚨 Preencha todos os campos obrigatórios!(*)');
    return;
  }

  if (this.fornecedor.forNomeFantasia.length > 100) {
    this.fornecedorService.showMessage('Total de letras permitidas no nome fantasia: 50');
    return;
  }

  if (this.fornecedor.forCnpj.length < 18) {
    this.fornecedorService.showMessage('O CNPJ inserido não é válido. Por favor, revise os dados.');
    return;
  }

  if (this.fornecedor.forRazaoSocial.length > 100) {
    this.fornecedorService.showMessage('Razão social deve ter no máximo 100 caracteres');
    return;
  }

  if (this.fornecedor.forTelefone.length < 15) {
    this.fornecedorService.showMessage('Número de telefone inválido.');
    return;
  }

  if (this.fornecedor.forCnpj.length < 18) {
    this.fornecedorService.showMessage('O CNPJ inserido não é válido. Por favor, revise os dados.');
    return;
  }


    this.fornecedorService.create(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor criado!')
      this.router.navigate(['/fornecedores'])
    })
}

  cancel(): void {
    this.router.navigate(['/fornecedores'])
  }  

}
