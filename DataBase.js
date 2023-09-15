const mongoose = require("mongoose");

const server = '127.0.0.1:27017'

// nome da database que vou usar
const database = "node";

// Nome da classe IGUAL ao arquivo
class DataBase {

    /* 
   async: não segue o código à risca, não trava caso por exemplo 
   eu chame a API e ela demore para retornar com o que solicitei
    */

    async _connect() {
        mongoose
            // já cria automático a tabela com base na database que inseri
            .connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log("Conectado no banco com sucesso")
            })
            .catch(() => {
                console.error("Erro ao conectar no banco")
            })
    }
}

module.exports = new DataBase();