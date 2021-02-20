const fetch = require('node-fetch');

async function loginFetch(data) {
    const fetchResponse = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers:{ 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;
  }

  module.exports = loginFetch