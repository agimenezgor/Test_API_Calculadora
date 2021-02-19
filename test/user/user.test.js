const registerFetch = require('./fetchData/registerFetch');

describe('User tests', () => {
    describe('Register tests', () => {
        test("Pasamos nombre incorrecto", async() => {
            // Arrange
            let user1 = Object();
            user1.name = "";
            user1.email = "user1@user1.com";
            user1.password = "12345678"
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.error.message).toBe("User validation failed: name: El nombre es necesario")
        })
        test("Pasamos email incorrecto", async () => {
            // Arrange
            let user1 = Object();
            user1.name = "User1";
            user1.email = "";
            user1.password = "12345678"
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.error.message).toBe("User validation failed: email: El email es necesario")
            
        })
        /* test("Pasamos email que ya existe", () => {
            // Arrange
            // Act
            // Assert
            
        }) */
        /* test("Pasamos password incorrecto", () => {
            // Arrange
            // Act
            // Assert
            
        }) */
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