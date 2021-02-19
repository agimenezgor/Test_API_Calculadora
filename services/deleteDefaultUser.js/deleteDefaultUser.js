const deleteFetch = require('../../test/user/fetchData/deleteFetch');

async function deleteDefaultUser(token){
    const response = await deleteFetch("user1@user1.com", token);
    if(response.message !== "Usuario borrado correctamente"){
        console.log("Problemas al borrar el usuario");
    }
}

module.exports = deleteDefaultUser;