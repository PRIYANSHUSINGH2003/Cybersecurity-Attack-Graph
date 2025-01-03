// pages/api/socket.js
const WebSocket = require('ws');  // Use CommonJS require
const mongoose = require('mongoose');

// MongoDB connection setup without deprecated options
mongoose.connect('mongodb+srv://priyanshu:110044@cluster0.pb8ps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


// WebSocket server setup
const wss = new WebSocket.Server({ port: 8080 });

// Define the MongoDB schema for attack graph data
const attackGraphSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    idx: { type: String, required: true },
    query: { type: String, required: true },
    agents: [{
        name: String,
        tools: [{
            name: String,
            input: String,
            output: String,
            idx: String,
        }],
        images: [String],
        output: String,
        idx: String,
    }],
    response: String,
    total_tokens: Number,
    is_active: { type: Boolean, default: true },
    edges: [{
        source: String,
        target: String,
        type: String,
    }]
});

const AttackGraph = mongoose.models.AttackGraph || mongoose.model('AttackGraph', attackGraphSchema);

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.on('message', async (message) => {
        console.log('Received message:', message);
        try {
            const data = JSON.parse(message);
            // Save data to MongoDB
            const attackGraph = new AttackGraph(data);
            await attackGraph.save();
            console.log('Data saved to MongoDB:', attackGraph);
        } catch (error) {
            console.error('Error parsing or saving data:', error);
        }
    });

    // Send initial graph data to the client
    AttackGraph.find().then((nodes) => {
        console.log('Sending initial data to client');
        const graphData = nodes.map((node) => ({
            data: {
                id: node.idx,
                name: node.agents.map(agent => agent.name).join(', '),
                output: node.agents.map(agent => agent.output).join(', '),
                query: node.query,
                response: node.response,
                total_tokens: node.total_tokens,
                is_active: node.is_active,
            },
        }));
        console.log('Sending initial data to client:', graphData);
        ws.send(JSON.stringify({ nodes: graphData }));
    }).catch((error) => {
        console.error('Error fetching data from MongoDB:', error);
    });

    // Simulate real-time data update every 5 seconds
    setInterval(() => {
        AttackGraph.find().then((nodes) => {
            console.log('Sending real-time data update');
            const graphData = nodes.map((node) => ({
                data: {
                    id: node.idx,
                    name: node.agents.map(agent => agent.name).join(', '),
                    output: node.agents.map(agent => agent.output).join(', '),
                    query: node.query,
                    response: node.response,
                    total_tokens: node.total_tokens,
                    is_active: node.is_active,
                },
            }));
            ws.send(JSON.stringify({ nodes: graphData }));
        }).catch((error) => {
            console.error('Error during real-time update:', error);
        });
    }, 5000);
});


module.exports = async (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'WebSocket server running' });
    }
};
