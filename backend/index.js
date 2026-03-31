const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from rebuild projects!',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice', city: 'Mumbai' },
        { id: 2, name: 'Bob',   city: 'Delhi'  },
        { id: 3, name: 'Carol', city: 'Pune'   }
    ]);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', port: PORT });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;
