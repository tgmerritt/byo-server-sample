const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/v3/conversation') {
    let data = '';
    
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      let jsonData;
      try {
          console.log(`received JSON: ${data}`)
          jsonData = JSON.parse(data);
      } catch (error) {
        res.statusCode = 400;
        res.end('Invalid JSON');
        return;
      }

      let responsePayload = {
        answer: 'Welcome',
        conversationPayload: '{}',
        instructions: {}
      }

      console.log('Replying with: ' + JSON.stringify(responsePayload))
      
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(responsePayload)); // Convert the object to JSON string before sending
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
