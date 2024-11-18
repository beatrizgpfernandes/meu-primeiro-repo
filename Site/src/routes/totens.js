var express = require("express");
var router = express.Router();

var totensController = require("../controllers/totensController");

// Rota para listar os totens, recebendo o parâmetro 'fkCompanhia'
router.get("/listarTotens/:fkCompanhia", function (req, res) {
  totensController.listarTotens(req, res); // Chama a função no controlador
});

router.get("/totemMaiorAlerta", function (req, res) {
    totensController.totemMaiorAlerta(req, res); // Chama a função no controlador
  });

router.get("/diaMaiorAlerta", function (req, res) {
    totensController.diaMaiorAlerta(req, res); // Chama a função no controlador
  });

module.exports = router;
