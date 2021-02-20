const fetch = require('node-fetch');

async function getAllFetch(token) {
    // Fetch             
    const fetchResponse = await fetch('http://localhost:3001/suppliers', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `BEARER ${token}`
        },
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;
  }
  module.exports = getAllFetch;