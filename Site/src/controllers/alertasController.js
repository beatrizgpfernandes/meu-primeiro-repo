var alertasModel = require("../models/alertasModel");

function listarTotens(req, res) {
  var mesSelecionado = req.params.mesSelecionado;
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  alertasModel.listarTotens(fkCompanhia, mesSelecionado) // Chama o método no modelo
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao listar os totens", error: error }); // Caso haja erro
    });
}

function totemMaiorAlerta(req, res) {
  var mesSelecionado = req.params.mesSelecionado;
  var fkCompanhia = req.params.fkCompanhia;
  alertasModel.totemMaiorAlerta(fkCompanhia, mesSelecionado) // Chama o método no modelo
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao exibir o totem com maior alerta", error: error }); // Caso haja erro
    });
}

function diaMaiorAlerta(req, res) {
  var mesSelecionado = req.params.mesSelecionado;
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  alertasModel.diaMaiorAlerta(fkCompanhia, mesSelecionado) // Chama o método no modelo
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao exibir o dia com maior alerta", error: error }); // Caso haja erro
    });
}

function listarMeses(req, res) {
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  alertasModel.listarMeses(fkCompanhia) // Chama o método no modelo
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao listar os totens", error: error }); // Caso haja erro
    });
}






// Rotas que estão plotando os gráficos
function gerarGraficoPassageirosPorMes(req, res) {
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  alertasModel.gerarGraficoPassageirosPorMes(fkCompanhia).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function gerarGraficoFrequenciaAlertas(req, res) {
    var mesSelecionado = req.params.mesSelecionado;
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  alertasModel.gerarGraficoFrequenciaAlertas(fkCompanhia, mesSelecionado).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listarTotens,
  totemMaiorAlerta,
  diaMaiorAlerta,
  listarMeses,
  gerarGraficoPassageirosPorMes,
  gerarGraficoFrequenciaAlertas
};
