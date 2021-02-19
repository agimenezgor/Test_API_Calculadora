const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');
const registerFetch = require("./fetchData/registerFetch");
const getSupplierFetch = require("./fetchData/getSupplierfetch");
// Proveedor por defecto
const supplier = Object();
            supplier.name = "Test supplier";
            supplier.number = 12345678;
            supplier.days = 3;
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;
            
// Primero creamos un usuario y guardamos el token.
let token = '';
beforeAll(async () => {
    token = await initDefaultUser();
})
// Finalmente, borramos el usuario
afterAll(async () => {
    await deleteDefaultUser(token);
})
describe('Supplier tests', () => {
    describe('Register', () => {
        test("pasamos nombre incorrecto", async () => {
            // Arrange
            const supplier = Object();
            supplier.name = "";
            supplier.number = 12345678;
            supplier.days = 3;
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;
            // Act
            const response = await registerFetch(supplier, token);
            // Assert
            expect(response.error.message).toBe("Supplier validation failed: name: El nombre es necesario")
        })
        test("pasamos número incorrecto", async () => {
            // Arrange
            const supplier = Object();
            supplier.name = "Test supplier";
            supplier.number = '';
            supplier.days = 3;
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;
            // Act
            const response = await registerFetch(supplier, token);
            // Assert
            expect(response.error.message).toBe("Supplier validation failed: number: La número de proveedor es necesario")
        })
        test("pasamos días incorrectos", async () => {
            // Arrange
            const supplier = Object();
            supplier.name = "Test supplier";
            supplier.number = 12345678;
            supplier.days = '';
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;
            // Act
            const response = await registerFetch(supplier, token);
            // Assert
            expect(response.error.message).toBe("Supplier validation failed: days: La cantidad de días que tardan en servir es necesaria")
        })
        test("pasamos datos correctos", async () => {
            // Act
            const response = await registerFetch(supplier, token);
            // Assert
            expect(response.message).toBe("Proveedor guardado correctamente")
        })
    })
    describe('getSupplier', async () => {
        /* test("comprobamos que se ha guardado el proveedor", async () => {
            // Act
            const response = await getSupplierFetch(12345678, token);
            console.log(response)
            // Assert
            expect(response.message).toBe("Proveedor guardado correctamente")
        }) */
    })
    /* describe('getAll', async () => {
        // Guardamos varios proveedores
        // Comprobamos que todos están en la lista
        // Creamos nuevos proveedores con otro usuario
        // Volvemos a llamar a la API y comprobamos que los nuevo usuarios creados NO están en la respuesta
    }) */
    /* describe('Update', async () => {
        // modificamos proveedor sin modificar número
        // modificamos proveedor modificando número
        // modificamos tipo de calculo palets
        // modificamos tipo de cálculo kilos
        // modificamos tipo de cálculo franco
    }) */
    /* describe('Delete', async () => {
        // Borramos el proveedor
        // comprobamos que no existe en la base de datos
    }) */
})

    // 4 - Finalmente, borramos el usuario