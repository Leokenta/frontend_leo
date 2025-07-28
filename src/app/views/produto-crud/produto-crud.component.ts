import { Component, OnInit } from '@angular/core';
//importação do route para navagação a tela de produtos
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-crud',
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.css']
})

export class ProdutoCrudComponent implements OnInit {

  //construtor para configurar botao para tela de produto
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //criando interação com botoes
  navigateToProdutoCreate(): void{
    this.router.navigate(['/produtos/create'])
  }

}
