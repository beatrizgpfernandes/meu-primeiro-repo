var database = require("../database/config");

function autenticar(email, senha) {
    const instrucaoSql = `
        SELECT 
            idFuncionario, 
            nome, 
            email,
            cargo,
            fkCompanhia
        FROM 
            Funcionario 
        WHERE 
            email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function cadastroTotem (nomeTotem, numSerie, fabricante, ano, companhia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadatroTotem():", );



    var instrucaoSql = `INSERT INTO Totem (nome_totem, codigo_serie, fabricante, ano_totem, fkCompanhia) Values ('${nomeTotem}','${numSerie}','${fabricante}','${ano}','${companhia}')`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCodigoSeguranca(codSeg) {
    const instrucaoSql = `
        SELECT idCompanhia, 
            CASE 
                WHEN chave_seguranca_analista = '${codSeg}' THEN 'analista'
                WHEN chave_seguranca_gerente = '${codSeg}' THEN 'gerente'
                ELSE null 
            END AS cargo
        FROM Companhia 
        WHERE chave_seguranca_analista = '${codSeg}' OR chave_seguranca_gerente = '${codSeg}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(idCompanhia, cargo, nome, email, senha) {
    const instrucaoSql = `
        INSERT INTO Funcionario (nome, cargo, email, senha, fkCompanhia)
        VALUES ('${nome}', '${cargo}', '${email}', '${senha}', ${idCompanhia});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    verificarCodigoSeguranca,
    cadastrar,
    cadastroTotem
};
