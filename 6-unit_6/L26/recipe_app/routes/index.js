const router = require("express").Router(),
    subscriberRoutes = require('./subscriberRoutes'),
    courseRoutes = require("./courseRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes");

router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);

router.use(errorRoutes);

module.exports = router;