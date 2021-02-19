const fetch = require('node-fetch');

async function registerFetch(data) {                    
    const fetchResponse = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        body: JSON.stringify({name: data.name, email: data.email, password: data.password }),
        headers:{'Content-Type': 'application/json'},
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;
  }

  module.exports = registerFetch;