// importamos servicios de usuario
const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

// importamos servicios de proveedor
const supplierRegisterFetch = require("../../services/fetchDataServices/supplierFetch/registerFetch");
const supplierDeleteFetch = require("../../services/fetchDataServices/supplierFetch/deleteFetch");

// importamos servicios de referencias
const registerFetch = require("../../services/fetchDataServices/referenceFetch/registerFetch");
const deleteFetch = require("../../services/fetchDataServices/referenceFetch/deleteFetch");
const getAllFetch = require("../../services/fetchDataServices/referenceFetch/getAllFetch");

// importamos servicios de pedidos
const orderFetch = require("../../services/fetchDataServices/orderFetch/orderFetch");

// Usuario por defecto
let user = Object();
user.name = "Order user test";
user.email = "orderUser@test.com";
user.password = "12345678";

// Proveedores por defecto
// Proveedor por palets
const paletsSupplier = Object();
            paletsSupplier.name = "Test reference supplier";
            paletsSupplier.number = 12345677;
            paletsSupplier.days = 3;
            paletsSupplier.calculateType = "Palets";
            paletsSupplier.minPalets = 26;
            paletsSupplier.maxPalets = 26;
// Proveedor por kilos
const kilosSupplier = Object();
            kilosSupplier.name = "Test reference supplier";
            kilosSupplier.number = 12345678;
            kilosSupplier.days = 3;
            kilosSupplier.calculateType = "Kilos";
            kilosSupplier.minPalets = 26;
            kilosSupplier.maxPalets = 26;
// Proveedor por Franco
const moneySupplier = Object();
            moneySupplier.name = "Test reference supplier";
            moneySupplier.number = 12345679;
            moneySupplier.days = 3;
            moneySupplier.calculateType = "Franco";
            moneySupplier.minPalets = 26;
            moneySupplier.maxPalets = 26;

// Referencias por defecto
const defaultReference = Object();
            defaultReference.name = "Test reference";
            defaultReference.number = 12345677;
            defaultReference.conditioning = 48;
            defaultReference.facing = 24;
            defaultReference.sales = 4000;
const defaultReference2 = Object();
            defaultReference2.name = "Test reference 2";
            defaultReference2.number = 12345678;
            defaultReference2.conditioning = 48;
            defaultReference2.facing = 24;
            defaultReference2.sales = 3500;
const defaultReference3 = Object();
            defaultReference3.name = "Test reference 3";
            defaultReference3.number = 12345679;
            defaultReference3.conditioning = 48;
            defaultReference3.facing = 30;
            defaultReference3.sales = 6000;


async function initPaletReference (supplier) {
    // iniciamos el proveedor
    const supplierResponse = await supplierRegisterFetch(supplier, token);
    expect(supplierResponse.message).toBe("Proveedor guardado correctamente")
    
        // iniciamos las referencias
    const response1 = await registerFetch(defaultReference, supplier.number, token);
    expect(response1.message).toBe("Referencia guardada correctamente")
    const response2 = await registerFetch(defaultReference2, supplier.number, token);
    expect(response2.message).toBe("Referencia guardada correctamente")
    const response3 = await registerFetch(defaultReference3, supplier.number, token);
    expect(response3.message).toBe("Referencia guardada correctamente")
}

async function deletePaletsReference(supplier) {
    const deleteReferenceResponse = await deleteFetch(supplier.number, defaultReference.number, token)
    expect(deleteReferenceResponse.message).toBe("Referencia borrada correctamente");
    const deleteReferenceResponse2 = await deleteFetch(supplier.number, defaultReference2.number, token)
    expect(deleteReferenceResponse2.message).toBe("Referencia borrada correctamente");
    const deleteReferenceResponse3 = await deleteFetch(supplier.number, defaultReference3.number, token)
    expect(deleteReferenceResponse3.message).toBe("Referencia borrada correctamente");
    const deleteSupplierResponse = await supplierDeleteFetch(supplier.number, token);
    expect(deleteSupplierResponse.message).toBe("Proveedor borrado correctamente");
}
// Iniciamos el usuario y guardamos el token
let token = '';
beforeAll( async () => {
    token = await initDefaultUser(user);
})
afterAll( async () => {
    await deleteDefaultUser(user.email, token);
})
describe('Order tests', () => {
    /* describe('Datos previos', () => {
        test('El proveedor no existe', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('No hay referencias guardadas', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Todas las ventas son 0', async () => {
            // Arrange
            // Act
            // Assert
        })
    }) */
    describe('Order a palets', () => {
        test('Espacio menor que minPalets', async () => {
            // Arrange
            await initPaletReference(paletsSupplier);
            const data = [10, 12, 15];
            
            // Act
            const response = await orderFetch(data, paletsSupplier.number, token);
            // Assert
            const expectedResult = [];
            expectedResult[0] = 9;
            expectedResult[1] = 4;
            expectedResult[2]= 13;
            expect(response.orderArray[0].palets).toBe(expectedResult[0]);
            expect(response.orderArray[1].palets).toBe(expectedResult[1]);
            expect(response.orderArray[2].palets).toBe(expectedResult[2]);
            // borramos los datos
            await deletePaletsReference(paletsSupplier);
        })
        /* test('Espacio mayor o igual que minPalets y menor que maxPalets', async () => {
            // Arrange
            // Act
            // Assert
        }) */
        /* test('Espacio mayor o igual que maxPalets', async () => {
            // Arrange
            // Act
            // Assert
        }) */
    })
    /* describe('Order a kilos', () => {
        test('Espacio menor que minKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mayor que minKilos y menor que maxKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mayor que maxKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
    }) */
    /* describe('order a franco', () => {
        test('A franco', async () => {
            // Arrange
            // Act
            // Assert
        })
    }) */
})