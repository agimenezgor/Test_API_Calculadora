const fetch = require('node-fetch');

async function updateFetch(data, number, token) {  
    const fetchResponse = await fetch(`http://localhost:3001/suppliers/${number}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: data.name, number: data.number, days: data.days, calculateType: data.calculateType, 
          money: data.money, minKilos: data.minKilos, maxKilos: data.maxKilos, minPalets: data.minPalets, maxPalets: data.maxPalets}),
        headers: {
          'Content-Type':'application/json',
          'Authorization': `BEARER ${token}`
        },
      })
      .then(response => response.json())
      .then(response => {return response;})
    return fetchResponse;
}

    module.exports = updateFetch;