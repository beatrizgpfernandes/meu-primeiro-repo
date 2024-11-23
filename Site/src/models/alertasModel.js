var database = require("../database/config");

function listarTotens(fkCompanhia, mesSelecionado) {
    var instrucaoSql = `SELECT DISTINCT nome_totem FROM Totem 
                      JOIN Alerta ON idTotem = fkTotem 
                      WHERE fkCompanhia = '${fkCompanhia}' and MONTH(dtAlerta) = '${mesSelecionado}'`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function totemMaiorAlerta(fkCompanhia, mesSelecionado) {
    var instrucaoSql = `select nome_totem as nome 
from Totem join Alerta on fkTotem = idTotem 
join Companhia on idCompanhia = fkCompanhia 
where fkCompanhia = '${fkCompanhia}' and MONTH(dtAlerta) = '${mesSelecionado}'
group by idTotem order by count(*) desc limit 1`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function diaMaiorAlerta(fkCompanhia, mesSelecionado) {
    var instrucaoSql = `SELECT concat( DAY(dtAlerta) , "/" , MONTH (dtAlerta)) as dia
FROM Alerta join Totem on idTotem = fkTotem join Companhia on idCompanhia = fkCompanhia
WHERE MONTH(dtAlerta) = '${mesSelecionado}' AND YEAR(dtAlerta) = YEAR(CURRENT_DATE()) AND fkCompanhia = '${fkCompanhia}'
GROUP BY dtAlerta
ORDER BY COUNT(*) DESC
LIMIT 1`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function listarMeses(fkCompanhia) {
    var instrucaoSql = `select distinct upper(monthname(dtAlerta)) as mes, month(dtAlerta) as numMes from Alerta 
join Totem on idTotem = fkTotem 
join Companhia on idCompanhia = fkCompanhia where fkCompanhia = '${fkCompanhia}' order by numMes`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}





// Rotas que estão plotando os gráficos
function gerarGraficoPassageirosPorMes() {
    var instrucaoSql = `SELECT mesSigla, passageirosAzul
FROM movimentacao;`;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

function gerarGraficoFrequenciaAlertas(fkCompanhia, mesSelecionado) {
    var instrucaoSql = `
    WITH RECURSIVE DiasMes AS (
        SELECT DATE(CONCAT('2024-', '${mesSelecionado}', '-01')) AS diaMes
        UNION ALL
        SELECT DATE_ADD(diaMes, INTERVAL 1 DAY)
        FROM DiasMes
        WHERE diaMes < LAST_DAY(CONCAT('2024-', '${mesSelecionado}', '-01'))
    )
    SELECT 
        DATE_FORMAT(DiasMes.diaMes, '%d/%m') AS diaMes,
        IFNULL(COUNT(Alerta.idAlerta), 0) AS totalAlertas
    FROM DiasMes
    LEFT JOIN Alerta 
        ON DATE(Alerta.dtAlerta) = DiasMes.diaMes
        AND MONTH(Alerta.dtAlerta) = '${mesSelecionado}'
        AND YEAR(Alerta.dtAlerta) = 2024
    LEFT JOIN Totem 
        ON Alerta.fkTotem = Totem.idTotem
    LEFT JOIN Companhia 
        ON Totem.fkCompanhia = Companhia.idCompanhia 
        AND Companhia.idCompanhia = '${fkCompanhia}'
    GROUP BY DiasMes.diaMes
    ORDER BY DiasMes.diaMes;
    `;

    return database.executar(instrucaoSql); // Retorna a consulta ao banco de dados
}

module.exports = { listarTotens, totemMaiorAlerta, diaMaiorAlerta, listarMeses, gerarGraficoPassageirosPorMes, gerarGraficoFrequenciaAlertas };
