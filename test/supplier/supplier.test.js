// 1 - Primero creamos un usuario
// 2 - Iniciamos sesión y guardamos el token
// 3 - Realizamos todos los test 
// 4 - Finalmente, borramos el usuario

const deleteDefaultUser = require('../../services/deleteDefaultUser.js/deleteDefaultUser');
const initDefaultUser = require('../../services/initDefaultUser/initDefaultUser');

let token = '';
    // 3 - Realizamos todos los test 
beforeAll(async () => {
    token = await initDefaultUser();
})
afterAll(async () => {
    await deleteDefaultUser(token);
})
describe('Supplier tests', () => {
    describe('Register', () => {
        
        test("pasamos nombre incorrecto", () => {
            console.log("token")
        })
        // pasamos nombre incorrecto
        // pasamos número incorrecto
        // pasamos dias incorrectos
        // pasamos datos correctos
    })
    /* describe('getSupplier', async () => {
        // comprobamos que devuelve el proveedor creado
    }) */
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