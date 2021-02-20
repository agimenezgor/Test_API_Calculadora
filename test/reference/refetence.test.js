// funciones de crear usuario y borrarlo
const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

// fetch de la referencia
const registerFetch = require("./fetchData/registerFetch");
//const getSupplierFetch = require("./fetchData/getSupplierfetch");
//const deleteFetch = require("./fetchData/deleteFetch");
//const updateFetch = require("./fetchData/updateFetch");
//const getAllFetch = require("./fetchData/getAllFetch");

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

// Primero creamos un usuario y guardamos el token.
let token = '';
let supplierInit = [];
beforeAll(async (done) => {
    try {
        token = await initDefaultUser();
        await supplierRegisterFetch(supplier, token);
        done()
    } catch (error) {
        throw new Error('Error in reference beforeAll');
    }
})
// Finalmente, borramos el usuario
afterAll(async () => {
    await deleteDefaultUser(token);
    const response = await supplierDeleteFetch(supplier.number, token);
    console.log(response)
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
            const response = await registerFetch(reference, supplierInit.number, token);
            // Assert
            expect(response.error.message).toBe("Reference validation failed: name: El nombre es necesario")
        })
        /* test("pasamos número incorrecto", async () => {
            // Arrange
            const reference = Object();
            reference.name = "Test reference";
            reference.number = "";
            reference.conditioning = 3;
            reference.facing = 2;
            reference.sales = 26;
            // Act
            const response = await registerFetch(reference, token);
            // Assert
            expect(response.error.message).toBe("Supplier validation failed: number: La número de proveedor es necesario")
        }) */
        /* test("pasamos condicionante incorrecto", async () => {
            // Arrange
            const reference = Object();
            reference.name = "Test reference";
            reference.number = 12345678;
            reference.conditioning = "";
            reference.facing = 2;
            reference.sales = 26;
            // Act
            const response = await registerFetch(reference, token);
            // Assert
            expect(response.error.message).toBe("Supplier validation failed: days: La cantidad de días que tardan en servir es necesaria")
        }) */
        /* test("pasamos datos correctos", async () => {
            // Act
            const response = await registerFetch(defualtReference, token);
            // Assert
            expect(response.message).toBe("Proveedor guardado correctamente")
        }) */
    })
    /* describe('getSupplier', () => {
        test("comprobamos que se ha guardado el proveedor", async () => {
            // Act
            const response = await getSupplierFetch(12345678, token);
            // Assert
            expect(response.name).toBe(supplier.name);
            expect(parseInt(response.number)).toBe(supplier.number);
            expect(response.conditioning).toBe(supplier.conditioning);
            expect(response.facing).toBe(supplier.facing);
            expect(response.sales).toBe(supplier.sales);
        })
    }) */
    /* describe('Update', () => {
        /* test("sin modificar número", async () => {
            // Arrange
            const auxReference = Object();
            auxReference.name = "Modificado 1";
            // Act
            const response = await updateFetch(auxReference, 12345678, token);
            // Assert
            expect(response.message).toBe("Proveedor modificado correctamente");
            expect(response.reference.name).toBe(defaultReference.name);
            expect(parseInt(response.supplier.number)).toBe(defaultReference.number);
            expect(response.reference.conditioning).toBe(defaultReference.conditioning);
            expect(response.reference.facing).toBe(defaultReference.facing);
            expect(response.reference.sales).toBe(defaultReference.sales);
            let id = response.reference.supplier + response.reference.number;
            expect(response.reference.id).toBe(id);
        }) */
        /* test("modificando número", async () => {
            // Arrange
            const auxReference = Object();
            auxReference.name = defualtReference.name;
            auxReference.number = 87654321;
            const beforeReference = await getReferenceFetch(12345678, token);
            const referenceId = beforeReference.supplier + auxReference.number;
            // Act
            const response = await updateFetch(auxReference, 12345678, token);
            // Assert
            expect(response.message).toBe("Proveedor modificado correctamente");
            expect(response.reference.name).toBe(defualtReferencename);
            expect(parseInt(response.reference.number)).toBe(auxSupplier.number);
            expect(response.reference.conditioning).toBe(defualtReference.conditioning);
            expect(response.reference.facing).toBe(defualtReference);
            expect(response.reference.sales).toBe(defualtReference.sales);
            let id = response.reference.supplier + auxReference.number;
            expect(response.reference.id).toBe(id);
        }) 
    
    }) */
    /* describe('getAll', () => {
        test('nuevos proveedores', async () => {
            // Act
            // Guardamos dos proveedores nuevos
            const response2 = await registerFetch(defualtReference2, token);
            expect(response2.message).toBe("Proveedor guardado correctamente")
            const response3 = await registerFetch(defualtReference3, token);
            expect(response3.message).toBe("Proveedor guardado correctamente")
            
            // Comprobamos que todos están en la lista
            const references = await getAllFetch(token);
            
            // Assert
            expect(references[0].name).toBe("Test supplier");
            expect(references[1].name).toBe("Test supplier 2");
            expect(references[2].name).toBe("Test supplier 3");
        })
    }) */
    /* describe('Delete', () => {
        /* test("Borramos el proveedor", async () => {
            // Act
            const response = await deleteFetch(87654321, token);
            const response2 = await deleteFetch(defualtReference2.number, token);
            const response3 = await deleteFetch(defualtReference3.number, token);

            // Assert
            expect(response.message).toBe("Proveedor borrado correctamente");
            expect(response2.message).toBe("Proveedor borrado correctamente");
            expect(response3.message).toBe("Proveedor borrado correctamente");
        }) */
        /* test("Comprobamos que se ha borrado correctamente", async () => {
            // Act
            const response = await getReferenceFetch(12345678, token);
            // Assert
            expect(response.message).toBe("There was a problem trying to get the supplier")
        }) */
        /* test("borrar proveedor que no existe", async () => {
            // Act
            const response = await deleteFetch(defualtReference.number, token);
            // Assert
            expect(response.message).toBe("El proveedor no existe en la base de datos")
        }) 
    }) */
})