# Prueba Técnica para el Puesto de Líder Técnico
**Por Carlos Leon**  

## Introducción

Para esta prueba técnica, he decidido utilizar NestJS para aprovechar sus funcionalidades y optimizar tiempos de desarrollo. NestJS, con su arquitectura basada en módulos, proporciona la flexibilidad necesaria para escalar a microservicios.

## Supuestos

- El crédito se calcula sobre saldos globales con periodicidad semanal.
- La base de datos se implementó usando SQLite y está ubicada en `./database.sqlite`.
- La API está documentada con Swagger y es accesible en `http://localhost:5000/api`.

## Ambientación

Para configurar el entorno de desarrollo, utiliza los siguientes comandos:

- `yarn`
- `yarn start:dev`

## Proceso de Desarrollo

- **Definición del esquema de la base de datos**: El diagrama de la base de datos está disponible en `./docs/db_schema.drawio`. Para una mejor visualización, utilizar la extensión [vscode-drawio](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio).
- **Desarrollo de módulos**: Construí un módulo por cada tabla en la base de datos.
- **Gestión de la base de datos**: Utilicé TypeORM para manejar la base de datos, aprovechando su capacidad para manejar datos en formato JSON y persistirlos de manera relacional.
- **Seguridad**: Implementé la lógica de seguridad utilizando JWT.
- **Manejador de excepciones global**: Se agregó un manejador de excepciones global para evitar escribir bloques try-catch repetitivos y mejorar la legibilidad del código.

## Pruebas

- **Usuario de prueba**: Para las pruebas, utilicé el usuario `admin@admin.com` con la contraseña `admin`.
- **Colección de Postman**: Generé una colección de Postman a partir de Thunder Client, disponible en la carpeta `docs`.

## Requisitos Funcionales

- (Aquí puedes listar los requisitos funcionales específicos de la prueba técnica).

## Endpoints

### Crear un Usuario

- **Endpoint:** `POST /usuarios/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/usuarios/UserController_create)
- **Descripción:** Esta ruta, junto con `auth/sign/`, son las únicas que no requieren un JWT para facilitar las pruebas.

### Crear Ofertas para un Usuario

- **Endpoint:** `POST /usuarios/{userId}/ofertas/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/Productos%20de%20credito%20%2F%20Ofertas%20Predefinidas/OfferController_create)
- **Descripción:** 
  - Para crear una oferta a un usuario, primero hay que llenar el catálogo de Ofertas `/offer`.
  - Al solicitar a este endpoint las ofertas del usuario se hara una comparacion por el score para asignarlas en user-offer

### Crear un Préstamo Basado en la Oferta Seleccionada

- **Endpoint:** `POST /usuarios/{userId}/prestamos/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/usuarios/UserController_createLoan)
- **Descripción:** 
  - Al crear un préstamo se valida si corresponde a un registro preaprobado.
  - Se genera la tabla de amortización de acuerdo al préstamo.

### Aplicar un Pago

- **Endpoint:** `POST /prestamos/{loanId}/pagos/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/Pagos/PaymentController_create)
- **Descripción:** 
  - Para aplicar un pago se valida que el monto no sea menor al requerido, por lo que en esta implementación no se contemplan pagos parciales o adelantados. 
  - Sin embargo, la adecuación sería:
    - Definir en la tabla de amortización un campo de monto abonado.
    - Al aplicar el pago en `amortization.service`:
      - Si intereses > 0, restar a intereses.
      - Si no, abonar a capital.
      - Si el monto abonado > monto restante, abonar el sobrante al siguiente pago y registrarlo como otro pago para trazabilidad.
      - Actualizar montos restantes de la tabla de amortización.

  - Otro enfoque sería definir cuentas digitales para cada usuario donde se almacenaría el dinero hasta sumar el monto del pago y aplicarlo a la tabla de amortización.

## Puntos Extra

### Agregar Autenticación a los Endpoints

- **Endpoint:** `POST /auth/sign/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/Auth%20JWT/AuthController_auth)
- **Descripción:** 
  - Se agregó seguridad con JWT y generación de hash con salt.

### Crear un Endpoint para Revertir un Pago

- **Endpoint:** `POST /pagos/{paymentId}/revertir/`
- **Docs:** [Swagger Docs](http://localhost:5000/api#/Pagos/PaymentController_revert)
- **Descripción:** 
  - Al revertir un pago se marca el pago como revertido y se actualiza la tabla de amortización en su registro. Si el crédito está en estatus pagado, ya no aplica.

---
