const db = require('../database/config');

function getDiariaMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_perc)) AS memory_perc,
            ROUND(AVG(disk_perc)) AS disk_perc
        FROM Desempenho
        WHERE DATE(dtHora) = CURDATE()
    `;

    return db.executar(query);
}

function getSemanalMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_perc)) AS memory_perc,
            ROUND(AVG(disk_perc)) AS disk_perc
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE())
    `;
    return db.executar(query);
}

function getMensalMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_perc)) AS memory_perc,
            ROUND(AVG(disk_perc)) AS disk_perc
        FROM Desempenho
        WHERE MONTH(dtHora) = MONTH(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE())
    `;
    return db.executar(query);
}

function getTotemMetrics(codigoSerie) {
    const query = `
      SELECT 
          ROUND(AVG(cpu_usage)) AS cpu_usage,
          ROUND(AVG(memory_perc)) AS memory_perc,
          ROUND(AVG(disk_perc)) AS disk_perc
      FROM Desempenho
      WHERE fkTotem = ${codigoSerie}
      AND DATE(dtHora) = CURDATE()
  `;

    return db.executar(query);
}

function getAlertas(componente, periodo) {
    let query = '';

    switch (periodo) {
        case 'hora':
            query = `
                SELECT 
                    HOUR(dtAlerta) AS label, 
                    COUNT(*) AS total_alertas
                FROM 
                    alertas 
                WHERE 
                    componente = '${componente}' 
                    AND DATE(dtAlerta) = CURDATE()
                GROUP BY 
                    label
                ORDER BY 
                    label;
            `;
            break;
        case 'dia_semana':
            query = `
                SELECT 
                    DAYNAME(dtAlerta) AS label, 
                    COUNT(*) AS total_alertas
                FROM alertas 
                    WHERE 
                        componente = '${componente}'
                        AND WEEK(dtAlerta) = WEEK(CURDATE()) 
                        AND YEAR(dtAlerta) = YEAR(CURDATE())
                    GROUP BY 
                        label
                    ORDER BY 
                        FIELD(label, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            `;
            break;
        case 'semana_mes':
            query = `
                SELECT 
                    WEEK(dtAlerta) AS label, 
                    COUNT(*) AS total_alertas
                FROM 
                    alertas 
                WHERE 
                    componente = '${componente}'
                    AND MONTH(dtAlerta) = MONTH(CURDATE()) 
                    AND YEAR(dtAlerta) = YEAR(CURDATE())
                GROUP BY 
                    label
                ORDER BY 
                    label;
            `;
            break;
        default:
            throw new Error('Período inválido');
    }

    return db.executar(query);
}

function getRanking(periodo) {
    let query = '';

    switch (periodo) {
        case 'hora':
            query = `
                SELECT 
                    componente,
                    COUNT(*) AS total_alertas
                FROM alertas
                    WHERE 
                        DATE(dtAlerta) = CURDATE()
                    GROUP BY componente;
            `;
            break;
        case 'dia_semana':
            query = `
                SELECT 
                    componente,
                    COUNT(*) AS total_alertas
                FROM alertas
                    WHERE 
                        WEEK(dtAlerta) = WEEK(CURDATE()) 
                        AND YEAR(dtAlerta) = YEAR(CURDATE())
                    GROUP BY componente;
            `;
            break;
        case 'semana_mes':  
            query = `
                SELECT 
                    componente,
                    COUNT(*) AS total_alertas
                FROM alertas
                    WHERE 
                        MONTH(dtAlerta) = MONTH(CURDATE()) 
                        AND YEAR(dtAlerta) = YEAR(CURDATE())
                    GROUP BY componente;
            `;
            break;
        default:
            throw new Error('Período inválido');
    }

    return db.executar(query);
}


module.exports = {
    getDiariaMetrics,
    getSemanalMetrics,
    getMensalMetrics,
    getTotemMetrics,
    getAlertas,
    getRanking
};
