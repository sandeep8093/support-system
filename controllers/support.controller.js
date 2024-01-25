const Agent = require("../models/Agent");
const Ticket = require("../models/Ticket");


exports.getAllTicket = async (req, res) => {
  try {
    const { status = "", assignedTo = "", severity = "", type = "", sortBy = "" } = req.query;
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
    const savedTickets = await Ticket.find(filter).sort(sort)

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
exports.assignAgent = async (req, res) => {
  try {
    const { ticketId, assignedAgentId } = req.body;

    // Fetch the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    const agent = await Agent.findById(assignedAgentId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Assign the agent to the ticket
    ticket.assignedTo = agent.name;
    ticket.status = 'Assigned';

    // Save the updated ticket
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.resolveTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;

    // Fetch the ticket by ID
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Resolve the ticket
    ticket.status = 'Resolved';
    ticket.resolvedOn = new Date();

    // Save the updated ticket
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTicket = async (req, res) => {
    try {
      if(req.body.assignedTo){
        const assignedAgent = await Agent.findById(req.body.assignedTo);
    
        if (!assignedAgent) {
          return res.status(404).json({ error: 'Assigned agent not found' });
        }
      }
        const newTicket = new Ticket(req.body);
        newTicket.assignedTo=assignedAgent.name;
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