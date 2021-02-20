const registerFetch = require('../../services/fetchDataServices/userFetch/registerFetch');
const loginFetch = require('../../services/fetchDataServices/userFetch/loginFetch');
const deleteFetch = require('../../services/fetchDataServices/userFetch/deleteFetch');
let user1 = Object();
user1.name = "User1";
user1.email = "user1@user1.com";
user1.password = "12345678";

let token = '';

describe('User tests', () => {
    describe('Register tests', () => {
        test("Pasamos nombre incorrecto", async() => {
            // Arrange
            let user = Object();
            user.name = "";
            user.email = "user@user.com";
            user.password = "12345678";
            // Act
            const response = await registerFetch(user);
            // Assert
            expect(response.error.message).toBe("User validation failed: name: El nombre es necesario")
        })
        test("Pasamos email incorrecto", async () => {
            // Arrange
            let user = Object();
            user.name = "User";
            user.email = "";
            user.password = "12345678";
            // Act
            const response = await registerFetch(user);
            // Assert
            expect(response.error.message).toBe("User validation failed: email: El email es necesario")
            
        })
        test("Pasamos password incorrecto", async () => {
            // Arrange
            let user = Object();
            user.name = "User";
            user.email = "user@user.com";
            user.password = "";
            // Act
            const response = await registerFetch(user);
            // Assert
            expect(response.error.message).toBe("User validation failed: password: La contraseña es necesaria")
            
        })
        test("Pasamos datos correctos", async () => {
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.message).toBe("Usuario creado correctamente")
            
        })
        test("Pasamos email que ya existe", async () => {
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.error.code).toBe(11000)
        })
    })
    
    describe('Login tests', () => {
        test("Pasamos usuario que no existe", async () => {
            // Arrange
            let user = Object();
            user.email = "user@user.com";
            user.password = "12345678";
            // Act
            const response = await loginFetch(user);
            // Assert
            expect(response.message).toBe("El usuario no existe en la base de datos")
        })
        test("Pasamos contraseña incorrecta", async () => {
            // Arrange
            let user = Object();
            user.email = "user1@user1.com";
            user.password = "";
            // Act
            const response = await loginFetch(user);
            // Assert
            expect(response.message).toBe("La contraseña es incorrecta")
        })
        test("Pasamos datos correctos", async () => {
            // Arrange
            let user = Object();
            user.email = user1.email;
            user.password = user1.password;
            // Act
            const response = await loginFetch(user);
            token = response.token;
            // Assert
            expect(response.message).toBe("Sesión iniciada correctamente")
        })
    })

    describe("Borramos los datos del usuario", () =>{
        test("Borramos el usuario", async () => {
            // Act
            const response = await deleteFetch(user1.email, token);
            // Assert
            expect(response.message).toBe("Usuario borrado correctamente")
        })
        test("Comprobamos que se ha borrado correctamente", async () => {
            // Arrange
            let user = Object();
            user.email = user1.email;
            user.password = user1.password;
            // Act
            const response = await loginFetch(user);
            // Assert
            expect(response.message).toBe("El usuario no existe en la base de datos")
        })
    } )
})