const registerFetch = require('./fetchData/registerFetch');
let user1 = Object();
user1.name = "User1";
user1.email = "user1@user1.com";
user1.password = "12345678"

describe('User tests', () => {
    describe('Register tests', () => {
        test("Pasamos nombre incorrecto", async() => {
            // Arrange
            let user = Object();
            user.name = "";
            user.email = "user@user.com";
            user.password = "12345678"
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
            user.password = "12345678"
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
            user.password = ""
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
    
    /* describe('Login tests', () => {
        /* test("Pasamos usuario que no existe", () => {
            // Arrange
            // Act
            // Assert
        }) */
        /* test("Pasamos contraseña incorrecta", () => {
            // Arrange
            // Act
            // Assert
        }) */
        /* test("Pasamos datos correctos", () => {
            // Arrange
            // Act
            // Assert
        }) 
    }) */

    // borramos el usuario de la base de datos y comprobamos que se ha borrado correctamente
})