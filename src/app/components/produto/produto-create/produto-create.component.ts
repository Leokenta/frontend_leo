import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { Produto } from '../produto.model';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    prodNome: '',
    prodPrecoCusto: 0,
    prodPrecoVenda: 0,
    prodQtdEstoque: 0,
    prodCategoria:'',
    prodMarca:'',
  }

  

  //importando produtoService
  constructor(private produtoService: ProdutoService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }
 
  onPrecoInput(event: any): void {
  let value = event.target.value;

  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  if (!value) {
    event.target.value = '';
    return;
  }

  const numberValue = parseFloat(value) / 100;

  const formatted = numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  event.target.value = formatted;
}

private limparMascaraMonetaria(valor: string): number {
  if (!valor) return 0;

  const numeroLimpo = valor
    .replace(/\s/g, '')    // remove espaços
    .replace('R$', '')     // remove R$
    .replace(/\./g, '')    // remove pontos
    .replace(',', '.');    // troca vírgula por ponto

  return parseFloat(numeroLimpo);
}

  createProduto(): void {
    if (!this.produto.prodNome || !this.produto.prodPrecoCusto || !this.produto.prodPrecoVenda || !this.produto.prodQtdEstoque || !this.produto.prodCategoria || !this.produto.prodMarca) {
    alert('🚨 Preencha todos os campos obrigatórios!(*)');
    return;
  }

  if (this.produto.prodNome.length > 50) {
    this.produtoService.showMessage('Total de letras permitidas no nome: 50');
    return;
  }

    this.produtoService.create(this.produto).subscribe(() => {
      this.produtoService.showMessage('Produto criado!')
      this.router.navigate(['/produtos'])
    })
}

  cancel(): void {
    this.router.navigate(['/produtos'])
  }  

}
