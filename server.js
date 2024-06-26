const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', (message, isBinary) => {
		const text = isBinary ? message : message.toString();
		console.log('Received message:', text);
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(text);
			}
		});
	});
});