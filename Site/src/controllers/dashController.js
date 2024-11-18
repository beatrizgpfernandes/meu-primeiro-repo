const dashModel = require('../models/dashModel');

function getMetricasDiaria(req, res) {
    console.log("Chamando getMetricasDiaria");
    dashModel.getDiariaMetrics()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
            }
            res.json(result[0]);
        })
        .catch(error => {
            console.error("Erro ao buscar métricas diárias:", error);
            res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
        });
}

function getMetricasSemanal(req, res) {
    dashModel.getSemanalMetrics()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
            }
            res.json(result[0]);
        })
        .catch(error => {
            console.error("Erro ao buscar métricas semanais:", error);
            res.status(500).json({ error: 'Erro ao buscar métricas semanais.' });
        });
}

function getMetricasMensal(req, res) {
    dashModel.getMensalMetrics()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
            }
            res.json(result[0]);
        })
        .catch(error => res.status(500).json({ error: 'Erro ao buscar métricas mensais.' }));
}

function getMetricasTotem(req, res) {
    const codigoSerie = req.params.codigo_serie;

    if (!codigoSerie) {
        return res.status(400).json({ error: 'Código do totem não informado.' });
    }

    dashModel.getTotemMetrics(codigoSerie)
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada para este totem.' });
            }
            res.json(result[0]);
        })
        .catch(error => {
            console.error("Erro ao buscar métricas do totem:", error);
            res.status(500).json({ error: 'Erro ao buscar métricas do totem.' });
        });
}

async function getAlertas(req, res) {
    const componente = req.query.componente;
    const periodo = req.query.periodo;
  
    if (!componente || !periodo) {
      return res.status(400).json({ error: 'Componente ou período inválido.' });
    }
  
    try {
      const alertas = await dashModel.getAlertas(componente, periodo);
      res.json(alertas);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      res.status(500).json({ error: 'Erro ao buscar alertas.' });
    }
  }

  async function getRanking(req, res) {
    const periodo = req.query.periodo;

    try {
        const rankingData = await dashModel.getRanking(periodo);
        res.json(rankingData);
    } catch (error) {
        console.error('Erro ao buscar ranking:', error);
        res.status(500).json({ error: 'Erro ao buscar ranking.' });
    }
}

module.exports = { getRanking, getMetricasDiaria, getMetricasSemanal, getMetricasMensal, getMetricasTotem, getAlertas};
