const router = require("express").Router();
const controller = require("../controllers/dataController");

router.get("/", controller.getFilteredData);
router.get("/kpi", controller.getKPI);
router.get("/region", controller.getRegionDistribution);
router.get("/topic", controller.getTopicDistribution);
router.get("/country", controller.getCountryDistribution);
router.get("/year-intensity", controller.getIntensityByYear);
router.get("/pestle", controller.getPestleDistribution);
router.get("/bubble", controller.getBubbleData);
router.get("/options", controller.getOptions);

module.exports = router;
