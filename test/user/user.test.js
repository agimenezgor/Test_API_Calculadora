const registerFetch = require('./fetchData/registerFetch');

describe('User tests', () => {
    describe('Register tests', () => {
        test("Pasamos nombre incorrecto", async() => {
            // Arrange
            let user = Object();
            user.name = "";
            user.email = "user1@user1.com";
            user.password = "12345678"
            // Act
            const response = await registerFetch(user);
            // Assert
            expect(response.error.message).toBe("User validation failed: name: El nombre es necesario")
        })
        test("Pasamos email incorrecto", async () => {
            // Arrange
            let user = Object();
            user.name = "User1";
            user.email = "";
            user.password = "12345678"
            // Act
            const response = await registerFetch(user);
            // Assert
            expect(response.error.message).toBe("User validation failed: email: El email es necesario")
            
        })
        /* test("Pasamos email que ya existe", () => {
            // Arrange
            // Act
            // Assert
            
        }) */
        test("Pasamos password incorrecto", async () => {
            // Arrange
            let user = Object();
            user.name = "User1";
            user.email = "user1@user1.com";
            user.password = ""
            // Act
            const response = await registerFetch(user);
            // Assert
            console.log(response.error.message)
            expect(response.error.message).toBe("User validation failed: email: El email es necesario")
            
        })
        /* test("Pasamos datos correctos", () => {
            // Arrange
            // Act
            // Assert
            
        }) */
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