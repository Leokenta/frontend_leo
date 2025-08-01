import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
  totalEstoque: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<number>('http://localhost:8080/produtos/estoque-total')
      .subscribe({
        next: (total) => this.totalEstoque = total,
        error: (err) => console.error('Erro ao buscar total de estoque', err)
      });
  }
}
