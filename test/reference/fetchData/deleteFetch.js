const fetch = require('node-fetch');

async function deleteFetch(supplierNumber, referenceNumber, token) {         
    const fetchResponse = await fetch(`http://localhost:3001/references/${supplierNumber}/${referenceNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `BEARER ${token}`
        },
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;
}

module.exports = deleteFetch;