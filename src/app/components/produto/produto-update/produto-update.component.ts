import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  produto: Produto = {
    prodId: 0,
    prodNome: '',
    prodPrecoCusto: 0,
    prodPrecoVenda: 0,
    prodQtdEstoque: 0,
    prodCategoria: '',
    prodMarca: '',
    fornecedor: undefined
  };

  fornecedorSelecionado?: Fornecedor;

  precoCustoStr: string = '';
  precoVendaStr: string = '';

  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados: Fornecedor[] = [];
  fornecedorNomeSelecionado: string = '';

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const prodId = this.route.snapshot.paramMap.get('prodId');
    if (prodId) {
      this.produtoService.readById(prodId).subscribe({
        next: (prod) => {
          this.produto = prod;
          this.precoCustoStr = this.formatarMoeda(prod.prodPrecoCusto.toString());
          this.precoVendaStr = this.formatarMoeda(prod.prodPrecoVenda.toString());

          if (prod.fornecedor) {
            this.fornecedorSelecionado = prod.fornecedor;
            this.fornecedorNomeSelecionado = prod.fornecedor.forNomeFantasia;
          }
        },
        error: (err) => {
          console.error('Erro ao carregar produto:', err);
          alert('Erro ao carregar produto. Verifique o console.');
          this.router.navigate(['/produtos']);
        }
      });
    } else {
      alert('ID do produto não encontrado na URL.');
      this.router.navigate(['/produtos']);
    }

    // Carrega fornecedores para autocomplete
    this.fornecedorService.read().subscribe((data: Fornecedor[]) => {
      this.fornecedores = data;
      this.fornecedoresFiltrados = this.fornecedores;
    });
  }

  filtrarFornecedores(): void {
    const filtro = this.fornecedorNomeSelecionado.toLowerCase();
    this.fornecedoresFiltrados = this.fornecedores.filter(f =>
      f.forNomeFantasia.toLowerCase().includes(filtro)
    );
  }

  selecionarFornecedor(nomeFornecedor: string): void {
    const fornecedor = this.fornecedores.find(f => f.forNomeFantasia === nomeFornecedor);
    if (fornecedor) {
      this.fornecedorSelecionado = fornecedor;
      this.produto.fornecedor = fornecedor;
    }
  }

  onPrecoCustoInput(event: any): void {
    this.precoCustoStr = this.formatarMoeda(event.target.value);
  }

  onPrecoVendaInput(event: any): void {
    this.precoVendaStr = this.formatarMoeda(event.target.value);
  }

  private formatarMoeda(value: string): string {
    let v = value.replace(/\D/g, '');
    if (!v) return '';
    const numberValue = parseFloat(v) / 100;
    return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  private limparMascaraMonetaria(valor: string): number {
    if (!valor) return 0;
    const numeroLimpo = valor
      .replace(/\s/g, '')
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(numeroLimpo);
  }

  updateProduto(): void {
    this.produto.prodPrecoCusto = this.limparMascaraMonetaria(this.precoCustoStr);
    this.produto.prodPrecoVenda = this.limparMascaraMonetaria(this.precoVendaStr);

    if (this.fornecedorSelecionado) {
      this.produto.fornecedor = { forId: this.fornecedorSelecionado.forId } as Fornecedor;
    } else {
      alert('Selecione um fornecedor!');
      return;
    }

    if (!this.produto.prodNome || !this.produto.prodPrecoCusto || !this.produto.prodPrecoVenda ||
        !this.produto.prodQtdEstoque || !this.produto.prodCategoria || !this.produto.prodMarca) {
      alert('🚨 Preencha todos os campos obrigatórios!');
      return;
    }

    this.produtoService.update(this.produto).subscribe({
      next: () => {
        this.produtoService.showMessage('Produto atualizado!');
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        console.error('Erro ao atualizar produto:', err);
        alert('Erro no backend! Verifique o console.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }
}
