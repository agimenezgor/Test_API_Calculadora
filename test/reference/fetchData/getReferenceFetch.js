const fetch = require('node-fetch');

async function getReferenceFetch(supplierNumber, referenceNumber, token) {
    // Fetch             
    const fetchResponse = await fetch(`http://localhost:3001/references/${supplierNumber}/${referenceNumber}`, {
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

  module.exports = getReferenceFetch;