var database = require("../database/config");

function listarTotens(fkCompanhia) {
    var instrucaoSql = `SELECT DISTINCT nome_totem FROM Totem 
                      JOIN Alerta ON idTotem = fkTotem 
                      WHERE fkCompanhia = '${fkCompanhia}'`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function totemMaiorAlerta() {
    var instrucaoSql = `select nome_totem as nome from Totem join Alerta where fkTotem = idTotem group by idTotem order by count(*) desc limit 1;`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function diaMaiorAlerta() {
    var instrucaoSql = `SELECT concat( DAY(dtAlerta) , "/" , MONTH (dtAlerta)) as dia
FROM Alerta 
WHERE MONTH(dtAlerta) = MONTH(CURRENT_DATE()) AND YEAR(dtAlerta) = YEAR(CURRENT_DATE())
GROUP BY dtAlerta
ORDER BY COUNT(*) DESC
LIMIT 1`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

module.exports = { listarTotens, totemMaiorAlerta, diaMaiorAlerta };
