// funciones de crear usuario y borrarlo
const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

// fetch de la referencia
const registerFetch = require("./fetchData/registerFetch");
const getReferenceFetch = require("./fetchData/getReferencefetch");
const deleteFetch = require("./fetchData/deleteFetch");
const updateFetch = require("./fetchData/updateFetch");
const getAllFetch = require("./fetchData/getAllFetch");

// fetch del proveedor
const supplierRegisterFetch = require("../supplier/fetchData/registerFetch");
const supplierDeleteFetch = require("../supplier/fetchData/deleteFetch");

// Proveedor por defecto
const supplier = Object();
            supplier.name = "Test reference supplier";
            supplier.number = 12345678;
            supplier.days = 3;
            supplier.calculateType = "Palets";
            supplier.minPalets = 26;
            supplier.maxPalets = 26;

// Referencias por defecto
const defaultReference = Object();
            defaultReference.name = "Test reference";
            defaultReference.number = 12345678;
            defaultReference.conditioning = 48;
            defaultReference.facing = 2;
            defaultReference.sales = 100;
const defaultReference2 = Object();
            defaultReference2.name = "Test reference 2";
            defaultReference2.number = 12345677;
            defaultReference2.conditioning = 48;
            defaultReference2.facing = 2;
            defaultReference2.sales = 100;
const defaultReference3 = Object();
            defaultReference3.name = "Test reference 3";
            defaultReference3.number = 12345679;
            defaultReference3.conditioning = 48;
            defaultReference3.facing = 2;
            defaultReference3.sales = 100;

// Primero creamos un usuario y guardamos el token.
async function before(){
    token = await initDefaultUser();
    await supplierRegisterFetch(supplier, token);
}
async function after() {
    await supplierDeleteFetch(supplier.number, token);
    await deleteDefaultUser(token);
}
let token = '';
beforeAll(async() => {
    return await before()
})
// Finalmente, borramos el usuario
afterAll((done) => {
    after().then(() => done());
})
describe('Reference tests', () => {
    describe('Register', () => {
        test("pasamos nombre incorrecto", async () => {
            // Arrange
            const reference = Object();
            reference.name = "";
            reference.number = 12345678;
            reference.conditioning = 3;
            reference.facing = 2;
            reference.sales = 26;
            // Act
            const response = await registerFetch(reference, supplier.number, token);
            // Assert
            expect(response.error.message).toBe("Reference validation failed: name: El nombre es necesario")
        })
        test("pasamos número incorrecto", async () => {
            // Arrange
            const reference = Object();
            reference.name = "Test reference";
            reference.number = "";
            reference.conditioning = 3;
            reference.facing = 2;
            reference.sales = 26;
            // Act
            const response = await registerFetch(reference, supplier.number, token);
            // Assert
            expect(response.error.message).toBe("Reference validation failed: number: La número de referencia es necesario")
        })
        test("pasamos condicionante incorrecto", async () => {
            // Arrange
            const reference = Object();
            reference.name = "Test reference";
            reference.number = 12345678;
            reference.conditioning = "";
            reference.facing = 2;
            reference.sales = 26;
            // Act
            const response = await registerFetch(reference, supplier.number, token);
            // Assert
            expect(response.error.message).toBe("Reference validation failed: conditioning: El condicionante es necesario")
        })
        test("pasamos datos correctos", async () => {
            // Act
            const response = await registerFetch(defaultReference, supplier.number, token);
            // Assert
            expect(response.message).toBe("Referencia guardada correctamente")
        })
    })
    describe('getReference', () => {
        test("comprobamos que se ha guardado la referencia", async () => {
            // Act
            const response = await getReferenceFetch(supplier.number, 12345678, token);
            // Assert
            expect(response.name).toBe(defaultReference.name);
            expect(parseInt(response.number)).toBe(defaultReference.number);
            expect(response.conditioning).toBe(defaultReference.conditioning);
            expect(response.facing).toBe(defaultReference.facing);
            expect(response.sales).toBe(defaultReference.sales);
        })
    })
    describe('Update', () => {
        test("sin modificar número", async () => {
            // Arrange
            const auxReference = Object();
            auxReference.name = "Modificado 1";
            // Act
            const response = await updateFetch(auxReference, 12345678, supplier.number, token);
            // Assert
            expect(response.message).toBe("Referencia actualizada correctamente");
            expect(response.reference.name).toBe(auxReference.name);
            expect(parseInt(response.reference.number)).toBe(defaultReference.number);
            expect(response.reference.conditioning).toBe(defaultReference.conditioning);
            expect(response.reference.facing).toBe(defaultReference.facing);
            expect(response.reference.sales).toBe(defaultReference.sales);
            let id = response.reference.supplier + response.reference.number;
            expect(response.reference.id).toBe(id);
        })
        test("modificando número", async () => {
            // Arrange
            const auxReference = Object();
            auxReference.name = defaultReference.name;
            auxReference.number = 87654321;
            // Act
            const response = await updateFetch(auxReference, 12345678, supplier.number, token);
            // Assert
            expect(response.message).toBe("Referencia actualizada correctamente");
            expect(response.reference.name).toBe(defaultReference.name);
            expect(parseInt(response.reference.number)).toBe(auxReference.number);
            expect(response.reference.conditioning).toBe(defaultReference.conditioning);
            expect(response.reference.facing).toBe(defaultReference.facing);
            expect(response.reference.sales).toBe(defaultReference.sales);
            let id = response.reference.supplier + auxReference.number;
            expect(response.reference.id).toBe(id);
        })
    
    })
    describe('getAll', () => {
        test('nuevos proveedores', async () => {
            // Act
            // Guardamos dos proveedores nuevos
            const response2 = await registerFetch(defaultReference2, supplier.number, token);
            expect(response2.message).toBe("Referencia guardada correctamente")
            const response3 = await registerFetch(defaultReference3, supplier.number, token);
            expect(response3.message).toBe("Referencia guardada correctamente")
            
            // Comprobamos que todos están en la lista
            const references = await getAllFetch(supplier.number, token);
            
            // Assert
            expect(references[0].name).toBe("Test reference");
            expect(references[1].name).toBe("Test reference 2");
            expect(references[2].name).toBe("Test reference 3");
        })
    })
    describe('Delete', () => {
        test("Borramos las referencias", async () => {
            // Act
            const response = await deleteFetch(supplier.number, 87654321, token);
            const response2 = await deleteFetch(supplier.number, defaultReference2.number, token);
            const response3 = await deleteFetch(supplier.number, defaultReference3.number, token);

            // Assert
            expect(response.message).toBe("Referencia borrada correctamente");
            expect(response2.message).toBe("Referencia borrada correctamente");
            expect(response3.message).toBe("Referencia borrada correctamente");
        })
        test("Comprobamos que se han borrado correctamente", async () => {
            // Act
            const response = await getReferenceFetch(supplier.number, 12345678, token);
            // Assert
            expect(response.message).toBe("La referencia no existe en la base de datos")
        })
        test("borrar referencia que no existe", async () => {
            // Act
            const response = await deleteFetch(supplier.number, defaultReference.number, token);
            // Assert
            expect(response.message).toBe("Referencia no encontrada")
        })
    })
})