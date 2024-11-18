var usuarioModel = require("../models/usuarioModel");

async function autenticar(req, res) {
    const { emailServer: email, senhaServer: senha } = req.body;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        return res.status(400).send("Sua senha está indefinida!");
    }

    try {
        const resultado = await usuarioModel.autenticar(email, senha);
        if (resultado.length === 1) {
            const { idFuncionario, nome, email, cargo, fkCompanhia } = resultado[0];
            // Armazenando a fkCompanhia no sessionStorage
            res.json({ id: idFuncionario, nome, email, cargo, fkCompanhia });
        } else if (resultado.length === 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
        } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json(erro.sqlMessage);
    }
}

async function cadastroTotemControler(req, res) {
    const { nomeServer: nomeTotem, numSerieServer: numSerie, fabricanteServer: fabricante, anoServer: ano, companhiaServer: companhia} = req.body;
   
    usuarioModel.cadastroTotem(nomeTotem, numSerie, fabricante, ano, companhia)
        .then(
            function(resultado) {
                res.json(resultado);
            }
        ).catch(
            function(erro) {
                console.log(erro);
                console.log(
                    "\n Erro ao cadastrar totem! Erro:",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

async function verificarCodigoSeguranca(req, res) {
    const { codSeg } = req.body;

    if (!codSeg) {
        return res.status(400).send("Código de segurança não fornecido.");
    }

    try {
        const result = await usuarioModel.verificarCodigoSeguranca(codSeg);
        if (result.length > 0 && result[0].cargo) {
            const { idCompanhia, cargo } = result[0];
            res.json({ idCompanhia, cargo });
        } else {
            res.status(400).send("Código de segurança inválido.");
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).send("Erro ao verificar o código de segurança.");
    }
}

async function cadastrar(req, res) {
    const { nomeServer: nome, emailServer: email, senhaServer: senha, codSegServer: codSeg } = req.body;

    if (!nome || !email || !senha || !codSeg) {
        return res.status(400).send("Todos os campos devem ser preenchidos.");
    }

    try {
        const result = await usuarioModel.verificarCodigoSeguranca(codSeg);
        if (result.length === 0 || !result[0].cargo) {
            return res.status(400).send("Código de segurança inválido.");
        }

        const { idCompanhia, cargo } = result[0];
        await usuarioModel.cadastrar(idCompanhia, cargo, nome, email, senha);

        res.json({ message: "Usuário cadastrado com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).send("Erro ao realizar o cadastro.");
    }
}

module.exports = {
    autenticar,
    verificarCodigoSeguranca,
    cadastrar,
    cadastroTotemControler
};
