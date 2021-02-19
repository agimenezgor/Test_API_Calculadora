const registerFetch = require('./fetchData/registerFetch');
const loginFetch = require('./fetchData/loginFetch');
let user1 = Object();
user1.name = "User1";
user1.email = "user1@user1.com";
user1.password = "12345678";

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
        /* test("Pasamos datos correctos", async () => {
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.message).toBe("Usuario creado correctamente")
            
        }) */
        test("Pasamos email que ya existe", async () => {
            // Act
            const response = await registerFetch(user1);
            // Assert
            expect(response.error.code).toBe(11000)
        })
    })
    
    describe('Login tests', async () => {
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
            // Assert
            expect(response.message).toBe("Sesión iniciada correctamente")
        })
    })

    // borramos el usuario de la base de datos y comprobamos que se ha borrado correctamente
})