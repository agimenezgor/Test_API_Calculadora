// 1 - Primero creamos un usuario
// 2 - Iniciamos sesión y guardamos el token
// 3 - Realizamos todos los test 
// 4 - Finalmente, borramos el usuario

    // 1 - Primero creamos un usuario
let user1 = Object();
user1.name = "User1";
user1.email = "user1@user1.com";
user1.password = "12345678";

    // 2 - Iniciamos sesión y guardamos el token
let token = '';

    // 3 - Realizamos todos los test 
describe('Supplier tests', async () => {
    describe('Register', async () => {
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