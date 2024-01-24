const express = require("express");
const {createAgent,createTicket,getAllTicket,getAgents} =require("../controllers/support.controller.js");
const router = express.Router();


router.post('/support-agents',createAgent);
router.get('/support-agents',getAgents);
router.post('/support-tickets',createTicket);
router.get('/support-tickets', getAllTicket);

module.exports= router;