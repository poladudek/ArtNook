const express = require("express");
const screening_router = express.Router();
const screening_controller = require("../controllers/screening");
const { authenticateToken } = require('../middleware/auth');

screening_router.get("/", screening_controller.getAllScreenings); 
screening_router.get("/:id", screening_controller.getScreeningById);
screening_router.post("/", screening_controller.createScreening);
screening_router.delete("/:id", screening_controller.deleteScreening);

screening_router.post('/reserve/:id/:seat_num', authenticateToken, screening_controller.reserveSeat);
screening_router.get("/full/:id", screening_controller.getFullScreeningInfoById);

module.exports = screening_router;