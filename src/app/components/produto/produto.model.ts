import { Fornecedor } from "../fornecedor/fornecedor.model"

export interface Produto{
 prodId?: number
 prodNome: string
 prodPrecoCusto: number
 prodPrecoVenda: number
 prodQtdEstoque: number
 prodCategoria: string
 prodMarca: string
 fornecedorId?: number;
 fornecedor?: Fornecedor;
}
