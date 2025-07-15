import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';



@Component({
  selector: 'app-product-create', 
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    prodNome: '',
    prodPrecoCusto: 0,
    prodPrecoVenda: 0,
    prodQtdEstoque: 0,
    prodCategoria: '',
    prodMarca: '',
  }

  //importando productService
  constructor(private productService: ProductService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }  
}
