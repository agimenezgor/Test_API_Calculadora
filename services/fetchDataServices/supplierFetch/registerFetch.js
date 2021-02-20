const fetch = require('node-fetch');

async function registerFetch(data, token) {
    // Fetch    
    try {
      const fetchResponse = await fetch('http://localhost:3001/suppliers', {
        method: 'POST',
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
    } catch (error) {
      let response = {message : "Imposible conectar con el servidor. Inténtelo de nuevo más tarde"};
      return response;
    } 
}
module.exports = registerFetch;