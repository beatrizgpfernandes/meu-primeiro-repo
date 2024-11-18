var totensModel = require("../models/totensModel");

function listarTotens(req, res) {
  var fkCompanhia = req.params.fkCompanhia; // Recebe o parâmetro da requisição
  totensModel.listarTotens(fkCompanhia) // Chama o método no modelo
    .then((resultado) => {
      res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao listar os totens", error: error }); // Caso haja erro
    });
}

function totemMaiorAlerta(req, res) {
    totensModel.totemMaiorAlerta() // Chama o método no modelo
      .then((resultado) => {
        res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
      })
      .catch((error) => {
        res.status(500).json({ message: "Erro ao exibir o totem com maior alerta", error: error }); // Caso haja erro
      });
  }

  function diaMaiorAlerta(req, res) {
    totensModel.diaMaiorAlerta() // Chama o método no modelo
      .then((resultado) => {
        res.status(200).json(resultado); // Retorna o resultado da consulta para o cliente
      })
      .catch((error) => {
        res.status(500).json({ message: "Erro ao exibir o dia com maior alerta", error: error }); // Caso haja erro
      });
  }

module.exports = {
  listarTotens,
  totemMaiorAlerta,
  diaMaiorAlerta
};
