// 1 - creamos un nuevo usuario
// 2 - creamos las referencias de muestra
// 3 - comprobamos que se han guardado mediante la función getAll
// 4 - creamos el objeto en el que meteremos la cantidad de palets que hay de cada referencia

// importamos servicios de usuario

// importamos servicios de proveedor

// importamos servicios de referencias

// importamos servicios de pedidos

    
beforeAll( async () => {
    // iniciamos el usuario
})
afterAll( async () => {
    // borrar referencias
    // borrar proveedores
    // borrar usuario
})
describe('Prder tests', () => {
    describe('Datos previos', () => {
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
    })
    describe('Order a palets', () => {
        test('Espacio menor que minPalets', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mmayor que minPalets y mayor que maxPalets', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mayor que maxPalets', async () => {
            // Arrange
            // Act
            // Assert
        })
    })
    describe('Order a kilos', () => {
        test('Espacio menor que minKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mayor que minKilos y mayor que maxKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
        test('Espacio mayor que maxKilos', async () => {
            // Arrange
            // Act
            // Assert
        })
    })
    describe('order a franco', () => {
        test('A franco', async () => {
            // Arrange
            // Act
            // Assert
        })
    })
})