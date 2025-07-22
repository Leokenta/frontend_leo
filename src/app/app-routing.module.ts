import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ProductCrudComponent} from  './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { FuncionarioCrudComponent } from './views/funcionario-crud/funcionario-crud.component';
import { FuncionarioCreateComponent } from './components/funcionario/funcionario-create/funcionario-create.component';
import { FuncionarioUpdateComponent } from './components/funcionario/funcionario-update/funcionario-update.component';
import { FuncionarioDeleteComponent } from './components/funcionario/funcionario-delete/funcionario-delete.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';


//configuração para rotear entre as paginas na home
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:prodId",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:prodId",
    component: ProductDeleteComponent
  },
  {
    path: "clientes",
    component: ClienteCrudComponent
  },
  {
    path: "clientes/create",
    component: ClienteCreateComponent
  },
  {
    path: "clientes/update/:cliId",
    component: ClienteUpdateComponent
  },
  {
    path: "clientes/delete/:cliId",
    component: ClienteDeleteComponent
  },
  {
    path: "funcionarios",
    component: FuncionarioCrudComponent
  },
  {
    path: "funcionarios/create",
    component: FuncionarioCreateComponent
  },
  {
    path: "funcionarios/update/:funId",
    component: FuncionarioUpdateComponent
  },
  {
    path: "funcionarios/delete/:funId",
    component: FuncionarioDeleteComponent
  },
  {
    path: "fornecedores",
    component: FornecedorCrudComponent
  },
  {
    path: "fornecedores/create",
    component: FornecedorCreateComponent
  },
  {
    path: "fornecedores/update/:forId",
    component: FornecedorUpdateComponent
  },
  {
    path: "fornecedores/delete/:forId",
    component: FornecedorDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
