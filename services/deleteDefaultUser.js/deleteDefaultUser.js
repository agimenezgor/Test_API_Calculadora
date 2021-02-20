const deleteFetch = require('../../test/user/fetchData/deleteFetch');

async function deleteDefaultUser(email, token){
    const response = await deleteFetch(email, token);
    if(response.message !== "Usuario borrado correctamente"){
        console.log("Problemas al borrar el usuario");
    }
}

module.exports = deleteDefaultUser;