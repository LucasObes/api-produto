class ProdutosService
{
    constructor () {}

    produtos = 
    [
        {
            "id": 1,
            "descricao": "Lata de Nescau",
            "estoque": true
        },
        {
            "id": 2,
            "descricao": "9mm pente alongado",
            "estoque": true
        }
    ]

    getProdutos(){
        return this.produtos;
    }

    addProdutos(produto){
        this.produtos.push(produto);
    }

    alteraProdutos(id, produto){
        const objProduto = this.produtos.find(p => p.id == id);

        if(!objProduto){
            return false
        }

        objProduto.descricao = produto.descricao;
        objProduto.estoque = produto.estoque;

        return true;
    }

    deletaProdutos(id){
        const produtosIndex = this.produtos.findIndex(p => p.id == id);

        if(produtosIndex === -1){
            return false;
        }

        this.produtos.splice(produtosIndex,1);

        return true;
    }
}

module.exports = ProdutosService;