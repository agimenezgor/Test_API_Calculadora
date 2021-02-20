const fetch = require('node-fetch');

  async function registerFetch(data, supplierNumber, token) {
    const fetchResponse = await fetch(`http://localhost:3001/references/${supplierNumber}`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name, number: data.number, conditioning: data.conditioning, facing: data.facing, sales: data.sales}),
        headers: {
          'Content-Type':'application/json',
          'Authorization': `BEARER ${token}`
        },
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;        
  } 

  module.exports = registerFetch;