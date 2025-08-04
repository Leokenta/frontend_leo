import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Produto {
  prodId?: number;
  prodNome: string;
  prodQtdEstoque: number;
  prodCategoria: string;
  prodPrecoVenda: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalProdutos = 0;
  produtos: Produto[] = [];
  produtosBaixoEstoque: (Produto & { percentualEstoque: number })[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.http.get<Produto[]>('http://localhost:8080/produtos').subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.totalProdutos = produtos.reduce((acc, p) => acc + p.prodQtdEstoque, 0);
        this.produtosBaixoEstoque = produtos
          .filter(p => p.prodQtdEstoque < 5)
          .map(p => ({
            ...p,
            percentualEstoque: Math.min((p.prodQtdEstoque / 5) * 100, 100)
          }));
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.produtos = [];
        this.produtosBaixoEstoque = [];
        this.totalProdutos = 0;
      }
    });
  }
}
