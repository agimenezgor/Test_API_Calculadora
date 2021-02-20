const fetch = require('node-fetch');

async function orderFetch(data, supplier, token) {         
    const fetchResponse = await fetch(`http://localhost:3001/order/${supplier}/${data}`, {
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

  module.exports = orderFetch;