var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

// Rota para listar os totens, recebendo o parâmetro 'fkCompanhia'
router.get("/listarTotens/:fkCompanhia/:mesSelecionado", function (req, res) {
  alertasController.listarTotens(req, res); // Chama a função no controlador
});

router.get("/totemMaiorAlerta/:fkCompanhia/:mesSelecionado", function (req, res) {
    alertasController.totemMaiorAlerta(req, res); // Chama a função no controlador
  });

router.get("/diaMaiorAlerta/:fkCompanhia/:mesSelecionado", function (req, res) {
    alertasController.diaMaiorAlerta(req, res); // Chama a função no controlador
  });

router.get("/listarMeses/:fkCompanhia", function (req, res) {
    alertasController.listarMeses(req, res); // Chama a função no controlador
  });




// Rotas que estão plotando os gráficos
router.get("/gerarGraficoPassageirosPorMes", function (req, res) {
  alertasController.gerarGraficoPassageirosPorMes(req, res); // Chama a função no controlador
});

router.get("/gerarGraficoFrequenciaAlertas/:fkCompanhia/:mesSelecionado", function (req, res) {
  alertasController.gerarGraficoFrequenciaAlertas(req, res); // Chama a função no controlador
});

module.exports = router;
