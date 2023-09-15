SECRET = "marcos678";
const jwt = require("jsonwebtoken");

const express = require("express");
const server = express();

const DataBase = require("./DataBase.js")
const Produtos = require("./Produtos.js")

const ProdutosService = require("./indexService.ts");
const produtosService = new ProdutosService();

server.use(express.json());

function verificaTokenJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    // Valida se o token é válido
    if (!token) {
        return res.status(401).send("Você não tem permissão para acessar a plataforma")
    }

    // verifica o token inserido, passo sempre o token, SECRET e uma function
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return res.send("Houve algum erro ao validar o token");
        }

        // decoded: envio o id decodificado
        req.usuarioId = decoded.id;
        // Libera o acesso ao id/token informado
        next();
    })
}

server.post("/login", (req, res, next) => {
    if (req.body.usuario === "marcos" && req.body.senha === "123") {
        // id do usuário logado
        const id = 1;

        const token = jwt.sign({ id }, SECRET, {
            // 5 minutos
            expiresIn: 5000
        })

        return res.json({ auth: true, token: token })
    }

    return res.status(500).json({ mensagem: "Usuário ou senha incorretos" })
})

server.get("/produtos", verificaTokenJWT, async (req, res) => {
    try {
        // Quando chamo 'Produtos', to chamando a Table inteira
        // .find(), .save(), etc. vem tudo do .Schema({})
        const produtos = await Produtos.find()

        // res.json(): retorna em JSON tudo que há no banco
        return res.json(produtos)
    }
    catch (error) {
        return res.status(500).send(error);
    }
})

server.post("/produtos", verificaTokenJWT, async (req, res) => {
    // pega as propriedades do que envio ao banco
    const { descricao, preco } = req.body;

    try {
        const novoProduto = new Produtos({
            /*
                colunaTableProdutos : valorNaTable(parâmetro)
            */
            descricao: descricao,
            preco: preco
        })

        const produto = await novoProduto.save();

        return res.json(produto)
    }
    catch (error) {
        res.status(500).send("Ocorreu um erro ao adicionar o produto burro: " + error)
    }
})

server.put("/produtos/:id", verificaTokenJWT, async (req, res) => {
    id = req.params.id;
    const { descricao, preco } = req.body;

    try {
        /*
            SELECT objeto FROM produtos WHERE ID = id
            UPDATE produto SET objeto = objeto WHERE id = id
        */
        const produtoEditado = await Produtos.findByIdAndUpdate(
            id,
            {
                descricao: descricao,
                preco: preco
            },
            {
                // Atualizo o produto que editei no banco
                new: true
            }
        )

        if (!produto) {
            return res.status(500).send("Produto não cadastrado seu burro")
        }

        return res.status(200).send("Produto atualizado com sucesso")
    }
    catch (error) {
        return res.status(500).send("Não foi possível atualizar o produto")
    }
})

server.delete("/produtos/:id", verificaTokenJWT, async (req, res) => {
    id = req.params.id;

    try {
        const produto = await Produtos.findByIdAndRemove(id);

        return res.status(200).send("Produto excluído com sucesso seu bagre");
    }
    catch (error) {
        return res.status(500).send("Não foi possível deletar o produto");
    }
})

async function startServer() {
    try {
        /* 
        await: quando vou chamar algo 'async', devo usar isso dai
        ele pede para o código esperar para executar uma função
        */
        await DataBase._connect();

        server.listen(3002, () => {
            console.log("VAMBORA PORRA")
        })
    }
    catch (error) {
        console.error("Falha ao conectar no banco: " + error);
    }
}

startServer();