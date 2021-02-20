const registerFetch = require('../fetchDataServices/userFetch/registerFetch');
const loginFetch = require('../fetchDataServices/userFetch/loginFetch');

async function initDefaultUser(user) {
    let token = '';
    // 1 - Primero creamos un usuario
    const registerResponse = await registerFetch(user);
    if(registerResponse.message !== "Usuario creado correctamente"){
        console.log("Problemas intentando registrar el usuario");
    }
    else{
        // 2 - Iniciamos sesión y guardamos el token
        let payload = Object();
        payload.email = user.email;
        payload.password = user.password;
        
        let loginResponse = await loginFetch(payload);
        token = loginResponse.token;
        if(loginResponse.message !== "Sesión iniciada correctamente"){
            console.log("Problemas intentando iniciar sesión");
        }
    }
    return token;
}
module.exports = initDefaultUser;