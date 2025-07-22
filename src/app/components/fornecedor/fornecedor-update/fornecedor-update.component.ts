import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedor!: Fornecedor;

  constructor(private fornecedorService: FornecedorService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId')
    this.fornecedorService.readById(forId!).subscribe((fornecedor: Fornecedor) =>{
      this.fornecedor = fornecedor
    })
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


  updateFornecedor(): void {
    if (!this.fornecedor.forNomeFantasia || !this.fornecedor.forCnpj || !this.fornecedor.forRazaoSocial) {
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


    this.fornecedorService.update(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor atualizado com sucesso!')
      this.router.navigate(['/fornecedores'])
    })
  }

  cancel(): void {
    this.router.navigate(['/fornecedores'])
  }
}
