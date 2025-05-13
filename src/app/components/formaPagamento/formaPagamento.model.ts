export interface FormaPagamento {
    fpgId?: number
    fpgDescricao: string
    fpgAtivo: string
    fpgPermiteParcelamento: string
    fpgNrMaxParcela: number
    fpgTaxaAdicional: number
}