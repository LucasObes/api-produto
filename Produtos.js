const mongoose = require("mongoose");

// Puxo a lib do Mongo e crio uma Table por meio de .Schema({})
const produtoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true
        // se o usuário não inserir nada, vai o que ta no default
        // default: 0
    }
})

// Armazeno a table dentro de uma variável para exportá-la posteriormente
// Varivavel = Modelo da tabela: "nomeTabela", propriedade
const Produtos = mongoose.model("Produto", produtoSchema);

module.exports = Produtos;