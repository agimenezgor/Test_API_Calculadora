// funciones de crear usuario y borrarlo
const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

// fetch del proveedor
const registerFetch = require("./fetchData/registerFetch");
const getSupplierFetch = require("./fetchData/getSupplierfetch");
const deleteFetch = require("./fetchData/deleteFetch");
const updateFetch = require("./fetchData/updateFetch");

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
    describe('getSupplier', () => {
        test("comprobamos que se ha guardado el proveedor", async () => {
            // Act
            const response = await getSupplierFetch(12345678, token);
            // Assert
            expect(response.name).toBe(supplier.name);
            expect(parseInt(response.number)).toBe(supplier.number);
            expect(response.days).toBe(supplier.days);
            expect(response.calculateType).toBe(supplier.calculateType);
            expect(response.minPalets).toBe(supplier.minPalets);
            expect(response.maxPalets).toBe(supplier.maxPalets);
        })
    })
    /* describe('getAll', () => {
        // Guardamos varios proveedores
        // Comprobamos que todos están en la lista
        // Creamos nuevos proveedores con otro usuario
        // Volvemos a llamar a la API y comprobamos que los nuevo usuarios creados NO están en la respuesta
    }) */
    describe('Update', () => {
        test("sin modificar número", async () => {
            // Arrange
            const auxSupplier = Object();
            auxSupplier.name = "Modificado 1";
            // Act
            const response = await updateFetch(auxSupplier, 12345678, token);
            // Assert
            expect(response.message).toBe("Proveedor modificado correctamente");
            expect(response.supplier.name).toBe(auxSupplier.name);
            expect(parseInt(response.supplier.number)).toBe(supplier.number);
            expect(response.supplier.days).toBe(supplier.days);
            expect(response.supplier.calculateType).toBe(supplier.calculateType);
            expect(response.supplier.minPalets).toBe(supplier.minPalets);
            expect(response.supplier.maxPalets).toBe(supplier.maxPalets);
            let id = response.supplier.user + response.supplier.number;
            expect(response.supplier.id).toBe(id);
        })
        test("modificando número", async () => {
            // Arrange
            const auxSupplier = Object();
            auxSupplier.name = supplier.name;
            auxSupplier.number = 87654321;
            const beforeSupplier = await getSupplierFetch(12345678, token);
            const supplierId = beforeSupplier.user + auxSupplier.number;
            // Act
            const response = await updateFetch(auxSupplier, 12345678, token);
            console.log(response)
            // Assert
            expect(response.message).toBe("Proveedor modificado correctamente");
            expect(response.supplier.name).toBe(supplier.name);
            expect(parseInt(response.supplier.number)).toBe(auxSupplier.number);
            expect(response.supplier.days).toBe(supplier.days);
            expect(response.supplier.calculateType).toBe(supplier.calculateType);
            expect(response.supplier.minPalets).toBe(supplier.minPalets);
            expect(response.supplier.maxPalets).toBe(supplier.maxPalets);
            let id = response.supplier.user + supplier.number;
            expect(response.supplier.id).toBe(id);
        })
        // modificamos tipo de calculo palets
        // modificamos tipo de cálculo kilos
        // modificamos tipo de cálculo franco
    })
    describe('Delete', () => {
        test("Borramos el proveedor", async () => {
            // Act
            const response = await deleteFetch(supplier.number, token);
            // Assert
            expect(response.message).toBe("Proveedor borrado correctamente")
        })
        test("Comprobamos que se ha borrado correctamente", async () => {
            // Act
            const response = await getSupplierFetch(12345678, token);
            // Assert
            expect(response.message).toBe("There was a problem trying to get the supplier")
        })
    })
})