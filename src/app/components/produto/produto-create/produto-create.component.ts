import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { Produto } from '../produto.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';

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
    prodCategoria: '',
    prodMarca: '',
    fornecedor: undefined
  };

  fornecedorSelecionado?: Fornecedor;

  precoCustoStr: string = '';   // campo para input formatado preço custo
  precoVendaStr: string = '';   // campo para input formatado preço venda

  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados: Fornecedor[] = [];
  fornecedorNomeSelecionado: string = '';

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.read().subscribe((data: Fornecedor[]) => {
      this.fornecedores = data;
      this.fornecedoresFiltrados = this.fornecedores;
    });
  }

  filtrarFornecedores() {
    const filtro = this.fornecedorNomeSelecionado.toLowerCase();
    this.fornecedoresFiltrados = this.fornecedores.filter(f =>
      f.forNomeFantasia.toLowerCase().includes(filtro)
    );
  }

  selecionarFornecedor(nomeFornecedor: string) {
    const fornecedorSelecionado = this.fornecedores.find(
      f => f.forNomeFantasia === nomeFornecedor
    );

    if (fornecedorSelecionado) {
      // 🔹 Guarda o fornecedor completo para enviar pro backend
      this.fornecedorSelecionado = fornecedorSelecionado;
      this.produto.fornecedor = fornecedorSelecionado;
    }
  }

  onPrecoCustoInput(event: any): void {
    this.precoCustoStr = this.formatarMoeda(event.target.value);
  }

  onPrecoVendaInput(event: any): void {
    this.precoVendaStr = this.formatarMoeda(event.target.value);
  }

  private formatarMoeda(value: string): string {
    // Remove tudo que não for número
    let v = value.replace(/\D/g, '');

    if (!v) return '';

    // Converte para número e divide por 100 para centavos
    const numberValue = parseFloat(v) / 100;

    // Formata para BRL
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
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
  // Limpa máscara e converte para número antes de enviar
  this.produto.prodPrecoCusto = this.limparMascaraMonetaria(this.precoCustoStr);
  this.produto.prodPrecoVenda = this.limparMascaraMonetaria(this.precoVendaStr);

  // Garante que fornecedor foi selecionado
  if (this.fornecedorSelecionado) {
    this.produto.fornecedor = { forId: this.fornecedorSelecionado.forId } as Fornecedor;
  } else {
    alert('Selecione um fornecedor!');
    return;
  }

  // Validação básica
  if (!this.produto.prodNome || !this.produto.prodPrecoCusto || 
      !this.produto.prodPrecoVenda || !this.produto.prodQtdEstoque ||
      !this.produto.prodCategoria || !this.produto.prodMarca || 
      !this.produto.fornecedor) {
    alert('🚨 Preencha todos os campos obrigatórios! (*)');
    return;
  }

  if (this.produto.prodNome.length > 50) {
    this.produtoService.showMessage('Total de letras permitidas no nome: 50');
    return;
  }

  this.produtoService.create(this.produto).subscribe({
    next: () => {
      this.produtoService.showMessage('Produto criado!');
      this.router.navigate(['/produtos']);
    },
    error: (err) => {
      console.error('Erro ao criar produto:', err);
      alert('Erro no backend! Verifique o console.');
    }
  });
}
cancel(): void {
    this.router.navigate(['/produtos']);
  }
}
