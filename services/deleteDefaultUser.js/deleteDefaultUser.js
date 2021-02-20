const deleteFetch = require('../fetchDataServices/userFetch/deleteFetch');

async function deleteDefaultUser(email, token){
    const response = await deleteFetch(email, token);
    if(response.message !== "Usuario borrado correctamente"){
        console.log("Problemas al borrar el usuario");
    }
}

module.exports = deleteDefaultUser;