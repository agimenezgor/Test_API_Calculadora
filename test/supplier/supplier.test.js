// funciones de crear usuario y borrarlo
const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

// fetch del proveedor
const registerFetch = require("./fetchData/registerFetch");
const getSupplierFetch = require("./fetchData/getSupplierfetch");
const deleteFetch = require("./fetchData/deleteFetch");
const updateFetch = require("./fetchData/updateFetch");
const getAllFetch = require("./fetchData/getAllFetch");

// Proveedor por defecto
const supplier = Object();
            supplier.name = "Test supplier";
            supplier.number = 12345678;
            supplier.days = 3;
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;
const supplier2 = Object();
            supplier2.name = "Test supplier 2";
            supplier2.number = 12345677;
            supplier2.days = 3;
            supplier2.calculateType = "Palets";
            supplier2.minPalets = 26;
            supplier2.maxPalets = 26;
const supplier3 = Object();
            supplier3.name = "Test supplier 3";
            supplier3.number = 12345679;
            supplier3.days = 3;
            supplier3.calculateType = "Palets";
            supplier3.minPalets = 26;
            supplier3.maxPalets = 26;

// Primero creamos un usuario y guardamos el token.
let token = '';
beforeAll(async (done) => {
    token = await initDefaultUser();
    done()
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
            // Assert
            expect(response.message).toBe("Proveedor modificado correctamente");
            expect(response.supplier.name).toBe(supplier.name);
            expect(parseInt(response.supplier.number)).toBe(auxSupplier.number);
            expect(response.supplier.days).toBe(supplier.days);
            expect(response.supplier.calculateType).toBe(supplier.calculateType);
            expect(response.supplier.minPalets).toBe(supplier.minPalets);
            expect(response.supplier.maxPalets).toBe(supplier.maxPalets);
            let id = response.supplier.user + auxSupplier.number;
            expect(response.supplier.id).toBe(id);
        })
        describe('Modificando tipo de cálculo a kilos', () => {
            test("sin añadir kilos", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Kilos";
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minKilos y maxKilos");
            })
            test("solo maxKilos", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Kilos";
                auxSupplier.maxKilos = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minKilos y maxKilos");
            })
            test("solo minKilos", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Kilos";
                auxSupplier.minKilos = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minKilos y maxKilos");
            })
            test("modificado correctamente", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Kilos";
                auxSupplier.minKilos = 22;
                auxSupplier.maxKilos = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Proveedor modificado correctamente");
            })
        })
        describe('Modificando tipo de cálculo a Palets', () => {
            test("sin añadir palets", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Palets";
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minPalets y maxPalets");
            })
            test("solo maxPalets", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Palets";
                auxSupplier.maxPalets = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minPalets y maxPalets");
            })
            test("solo minPalets", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Palets";
                auxSupplier.minPalets = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también las variables minPalets y maxPalets");
            })
            test("modificado correctamente", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Palets";
                auxSupplier.minPalets = 22;
                auxSupplier.maxPalets = 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Proveedor modificado correctamente");
            })
        })
        describe('Modificando tipo de cálculo a Franco', () => {
            test("sin añadir palets", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Franco";
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Es necesario modificar también la variable money");
            })
            test("modificado correctamente", async () => {
                // Arrange
                let auxSupplier = Object();
                auxSupplier.calculateType = "Franco";
                auxSupplier.money= 22;
                // Act
                const response = await updateFetch(auxSupplier, 87654321, token);
                // Assert
                expect(response.message).toBe("Proveedor modificado correctamente");
            })
        })
    })
    describe('getAll', () => {
        test('nuevos proveedores', async () => {
            // Act
            // Guardamos dos proveedores nuevos
            const response2 = await registerFetch(supplier2, token);
            expect(response2.message).toBe("Proveedor guardado correctamente")
            const response3 = await registerFetch(supplier3, token);
            expect(response3.message).toBe("Proveedor guardado correctamente")
            
            // Comprobamos que todos están en la lista
            const suppliers = await getAllFetch(token);
            
            // Assert
            expect(suppliers[0].name).toBe("Test supplier");
            expect(suppliers[1].name).toBe("Test supplier 2");
            expect(suppliers[2].name).toBe("Test supplier 3");
        })
    })
    describe('Delete', () => {
        test("Borramos el proveedor", async () => {
            // Act
            const response = await deleteFetch(87654321, token);
            const response2 = await deleteFetch(supplier2.number, token);
            const response3 = await deleteFetch(supplier3.number, token);

            // Assert
            expect(response.message).toBe("Proveedor borrado correctamente");
            expect(response2.message).toBe("Proveedor borrado correctamente");
            expect(response3.message).toBe("Proveedor borrado correctamente");
        })
        test("Comprobamos que se ha borrado correctamente", async () => {
            // Act
            const response = await getSupplierFetch(12345678, token);
            // Assert
            expect(response.message).toBe("There was a problem trying to get the supplier")
        })
        test("borrar proveedor que no existe", async () => {
            // Act
            const response = await deleteFetch(supplier.number, token);
            // Assert
            expect(response.message).toBe("El proveedor no existe en la base de datos")
        })
    })
})