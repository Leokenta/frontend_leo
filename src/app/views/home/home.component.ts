import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../../components/produto/produto.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalProdutos: number = 0;
  produtosBaixoEstoque: Produto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarTotalEstoque();
    this.carregarProdutosBaixoEstoque();
  }

  carregarTotalEstoque() {
    this.http.get<number>('http://localhost:8080/produtos/estoque/total')
      .subscribe({
        next: (total) => this.totalProdutos = total,
        error: (err) => console.error('Erro ao buscar estoque total', err)
      });
  }

  carregarProdutosBaixoEstoque() {
    this.http.get<Produto[]>('http://localhost:8080/produtos')
      .subscribe({
        next: (produtos) => {
          this.produtosBaixoEstoque = produtos.filter(p => p.prodQtdEstoque < 5);
        },
        error: (err) => console.error('Erro ao buscar produtos', err)
      });
  }

}
