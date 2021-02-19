const registerFetch = require('../../test/user/fetchData/registerFetch');
const loginFetch = require('../../test/user/fetchData/loginFetch');

async function initDefaultUser() {
    let token = '';
    // 1 - Primero creamos un usuario
    let user1 = Object();
    user1.name = "User1";
    user1.email = "user1@user1.com";
    user1.password = "12345678";
    
    const registerResponse = await registerFetch(user1);
    if(registerResponse.message !== "Usuario creado correctamente"){
        console.log("Problemas intentando registrar el usuario");
    }
    else{
        // 2 - Iniciamos sesión y guardamos el token
        let payload = Object();
        payload.email = user1.email;
        payload.password = user1.password;
        
        let loginResponse = await loginFetch(payload);
        token = loginResponse.token;
        if(loginResponse.message !== "Sesión iniciada correctamente"){
            console.log("Problemas intentando iniciar sesión");
        }
    }
    return token;
}
module.exports = initDefaultUser;