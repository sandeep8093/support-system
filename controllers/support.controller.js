const Agent = require("../models/Agent");
const Ticket = require("../models/Ticket");


exports.getAllTicket = async (req, res) => {
  try {
    const { status = "", assignedTo = "", severity = "", type = "", sortBy = ""} = req.query;
    const filter = {};

    if (status !== "") {
    filter.status = status;
    }

    if (assignedTo !== "") {
    filter.assignedTo = assignedTo;
    }

    if (severity !== "") {
    filter.severity = severity;
    }

    if (type !== "") {
    filter.type = type;
    }

    const sort = {};

    if (sortBy === "resolvedOn") {
    sort.resolvedOn = 1; 
    } else if (sortBy === "dateCreated") {
    sort.dateCreated = 1; 
    }
    const savedTickets = await Ticket.find(filter).sort(sort);

    res.status(200).json(savedTickets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const savedAgents = await Agent.find();

    res.status(200).json(savedAgents);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.createTicket = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error);
        res.status(409).json({error: error.message});
  }
};

exports.createAgent = async (req, res) => {
    try {
        const newAgent = new Agent(req.body);
        // Check if agent already exists
        const savedAgent = await Agent.findOne({ email: req.body.email });
        if (savedAgent) {
            console.log("Exists");
            throw new Error("Support Agent Already exists");
        } else {
            await newAgent.save();
            res.status(201).json(newAgent);
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({error: error.message});
    }
  };