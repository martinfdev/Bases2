#### Universidad de San Carlos de Guatemala
#### Facultad de Ingenieria
#### Sistemas de Bases de Datos 2
#### Ing. Marlon Francisco Orellana Lopez
#### Auxiliar: Carlos Roberto Rangel Castillo
<br><br><br><br><br><br><br>
<p style="text-align: center;"><strong> Primera Fase <br>
</strong></p>
<br><br><br><br><br><br><br>

| Nombre                              | Carnet    |
| :---:                               |  :----:   |
| Eduardo Alexander Reyes Gonzalez    | 202010904 |
| Pedro Martin Francisco              | 201700656 |
| Luis Antonio Cutzal Chalí           | 201700841 |
<br><br>

<h1> Introducción </h1>
<p style="text-align: justify;">
El proyecto "Sistema Hospitalario Digital" tiene como propósito desarrollar una solución integral para la gestión de expedientes médicos digitales, áreas hospitalarias y usuarios, como parte del curso "Sistemas de Bases de Datos 2". La iniciativa busca mejorar la eficiencia y la organización en el manejo de la información dentro de un entorno hospitalario, utilizando tanto bases de datos relacionales como no relacionales, y tecnologías de vanguardia. El proyecto se llevará a cabo en tres fases, cada una con objetivos y entregables específicos, lo que nos permitirá abordar el desarrollo de manera estructurada y organizada. Trabajar de manera colaborativa en este proyecto no solo nos permitirá aplicar los conocimientos adquiridos, sino también fortalecer la comunicación y la cooperación en equipo, asegurando así un desarrollo exitoso dentro de los plazos establecidos.
</p>

<h1> Objetivos </h1>
<h2> Objetivo general </h2>

- Desarrollar un sistema hospitalario digital que permita la gestión integral de
expedientes médicos, áreas hospitalarias y usuarios, utilizando tecnologías como
SQL Server, MongoDB, Redis y Neo4j, para garantizar eficiencia, escalabilidad y
trazabilidad de la información.

<h2> Objetivos específicos </h2>

1. Diseñar una base de datos relacional en SQL Server para gestionar usuarios
y áreas hospitalarias, asegurando su correcta normalización y funcionalidad.
2. Implementar una base de datos no relacional en MongoDB para almacenar y
gestionar los expedientes médicos digitales de los pacientes.
3. Configurar un sistema de bitácora y auditoría en Redis para registrar todas
las operaciones y errores del sistema.
4. Desarrollar interfaces intuitivas y seguras para cada tipo de usuario:
administrador, doctor y enfermera.
5. Generar reportes y estadísticas hospitalarias en formato PDF y Excel, para
facilitar la toma de decisiones.
6. Implementar un módulo de visualización gráfica en Neo4j para gestionar la
ocupación y distribución de pacientes en áreas hospitalarias.

Entrega de documentación con arquitectura, configuraciones y decisiones
implementadas

<h1>Arquitectura utilizada </h1>

Utilizamos una arquitectura orientada a servicios (SOA) donde la capa de usuario interactúa con los microservicios que, a su vez, interactúan con diversas bases de datos para almacenar y recuperar información.

![Imagen arquitectura](img_manual/Arquitectura.png)

- Capa de Usuario: A la izquierda, se encuentra una representación de un usuario que interactúa con la interfaz web construida con Vite y React.
- Capa de Lógica de Negocio: En el centro de la imagen, hay varios bloques que representan servicios. Cada uno de estos servicios está basado en Python, lo que indica que la lógica del sistema se maneja mediante varios microservicios. Esta arquitectura permite escalabilidad y modularidad. 
- Capa de Acceso a Datos: A la derecha se encuentran varias bases de datos y tecnologías de almacenamiento: SQL Server, MongoDB, Neo4j y Reddis.


<h1> Requerimientos Funcionales </h1>

<h2>Gestión de Expedientes Médicos </h2>

- El sistema debe permitir crear, leer, actualizar y eliminar (CRUD) expedientes médicos digitales de los pacientes
- Los expedientes deben contener información personal del paciente, historial médico, diagnósticos, tratamientos y resultados de pruebas.
- Los expedientes médicos deben estar organizados por el ID del paciente y ser fácilmente accesibles por los profesionales autorizados.
<h2>Gestión de Usuarios </h2>

- El sistema debe permitir la creación de perfiles de usuario con distintos roles (administrador, médico, enfermero, etc.).
- Los usuarios deben tener diferentes niveles de acceso y permisos según su rol (por ejemplo, solo los médicos pueden modificar expedientes médicos).
- Debe haber un sistema de autenticación que permita a los usuarios iniciar sesión con nombre de usuario y contraseña.
- Todas las contraseñas seran encriptadas.
<h2>Gestión de Áreas Hospitalarias </h2>

- Permitir la administración de las áreas del hospital (consultorios, salas de emergencia, unidades de cuidado intensivo, etc.).
- permitir asignar pacientes a áreas específicas según su necesidad (por ejemplo, urgencias o habitación de internación).
<h2>Programación de Citas Médicas </h2>

- Permitir la programación, consulta y cancelación de citas médicas para los pacientes.
- Los médicos deben poder ver sus horarios disponibles y agendar nuevas consultas con los pacientes.
<h2>Notificaciones y Alertas </h2>

- El sistema debe enviar notificaciones a los usuarios cuando se realicen cambios importantes en los expedientes médicos, como la actualización de diagnósticos o resultados de pruebas.
- Los pacientes deben recibir alertas recordatorias para sus citas médicas y otros eventos importantes.
<h2>Informes y Reportes </h2>

- Permitir generar informes de pacientes, incluyendo sus citas, diagnósticos, y tratamientos.
- Generar reportes de las estadísticas de ocupación hospitalaria (por ejemplo, el número de camas ocupadas en cada área).

<h1>Requerimientos No Funcionales </h1>
<h2> Rendimiento </h2>

- El sistema debe ser capaz de manejar simultáneamente las solicitudes de al menos 100 usuarios concurrentes sin afectar su rendimiento
- Las consultas a la base de datos deben ejecutarse en menos de 3 segundos para garantizar una experiencia de usuario fluida.
<h2> Seguridad </h2>

- Todos los datos sensibles, como la información médica de los pacientes, deben ser cifrados tanto en tránsito como en reposo.
- El sistema debe garantizar que solo los usuarios autorizados tengan acceso a la información confidencial mediante un sistema de autenticación robusto (por ejemplo, autenticación de dos factores).
<h2> Escalabilidad </h2>

- El sistema debe ser escalable para soportar el crecimiento del hospital, agregando más usuarios, pacientes y datos sin comprometer la funcionalidad.
- Debe ser posible agregar nuevas funcionalidades o módulos sin afectar el rendimiento del sistema.
<h2> Disponibilidad </h2>

- El sistema debe estar disponible al menos el 99% del tiempo (con un tiempo de inactividad máximo de 8 horas al mes) para asegurar que los usuarios puedan acceder al sistema cuando lo necesiten.
- El sistema debe contar con mecanismos de respaldo para evitar la pérdida de datos en caso de fallos.
<h2> Usabilidad </h2>

- El sistema debe tener una interfaz intuitiva y fácil de usar, para que médicos, enfermeros y administradores puedan interactuar con él sin dificultad, independientemente de su nivel técnico.
<h2> Mantenimiento </h2>

- El sistema debe ser fácil de mantener y actualizar, permitiendo agregar nuevas funcionalidades y corregir errores sin interrumpir su funcionamiento.
- Debe contar con documentación detallada para facilitar el trabajo del equipo de desarrollo y del equipo de soporte técnico.

<h2> Dependencias del sistema </h2>

- bcrypt==4.2.1: Esta biblioteca se utiliza para encriptar contraseñas de forma segura. bcrypt genera un hash único y seguro de las contraseñas, lo que hace que sea mucho más difícil para los atacantes descifrar las contraseñas incluso si logran obtener acceso a la base de datos.

- Flask-Cors==5.0.0: Esta biblioteca habilita CORS (Cross-Origin Resource Sharing) en tu aplicación Flask. Es útil cuando tu frontend (por ejemplo, React) está en un dominio diferente al de tu backend (Flask), permitiendo que ambos se comuniquen sin restricciones de origen cruzado.

- pip==24.3.1 = pip es la herramienta de gestión de paquetes de Python. Te permite instalar y gestionar las bibliotecas que necesitas para tu proyecto.

- PyJWT==2.10.1 = PyJWT se utiliza para trabajar con JSON Web Tokens (JWT), que son una forma segura de transmitir información entre sistemas.

- pyodbc==5.2.0: Esta biblioteca te permite conectarte y trabajar con bases de datos que soportan ODBC (como SQL Server). Usar pyodbc facilita realizar consultas SQL desde tu aplicación Python de manera eficiente.

- python-dotenv==1.0.1: python-dotenv se utiliza para gestionar variables de entorno de manera sencilla. Te permite almacenar información sensible, como claves de API o credenciales de base de datos, en un archivo .env que no se incluye en el control de versiones, manteniendo tus datos seguros.

- Flask==3.1.0: Flask es un microframework para construir aplicaciones web en Python. Es ligero y flexible, permitiendo a los desarrolladores crear aplicaciones web desde simples hasta complejas, a menudo utilizado en proyectos de API y sitios web pequeños a medianos.

- pymongo==4.10.1: pymongo es la biblioteca oficial para interactuar con MongoDB, una base de datos NoSQL. Esta herramienta te permite conectar tu aplicación Python a MongoDB, realizar consultas, insertar, actualizar y eliminar documentos en colecciones de forma sencilla y eficiente.

- redis==5.2.1: Al integrar Redis con tu aplicación Python, puedes mejorar el rendimiento al almacenar datos en memoria para accesos rápidos, como sesiones de usuario o datos que requieren ser leídos y escritos con frecuencia.

<h1> Estructura del Backend </h1>

- Este microservicio es el encargado de gestionar el inicio de sesión, la autenticación de usuarios y la autorización de acceso al sistema. Maneja el registro de usuarios, la generación de tokens JWT para mantener las sesiones, y verifica los permisos de los usuarios.
- Se comunica con todos los demás microservicios para validar si el usuario tiene los permisos necesarios para realizar ciertas acciones
- JWT (JSON Web Tokens) para la autenticación, Bcrypt para el cifrado de contraseñas.
<h2> Microservicio de Autenticación </h2>

-  Este microservicio gestionará las funcionalidades de administración del sistema, como la gestión de usuarios, roles y permisos, la configuración de parámetros del sistema y la supervisión general de los microservicios.
<h2> Microservicio de Administración  </h2>

- Colabora con el microservicio auth para gestionar el acceso de los usuarios y roles. Además, interactúa con otros servicios, como los de desarrolladores, doctores, enfermeras, para garantizar que los usuarios tengan acceso a las funcionalidades correctas.
- Base de datos SQL para almacenar la configuración y los roles de los usuarios.
<h2> Microservicio de Desarrolladores  </h2>

- Este microservicio gestionará las tareas relacionadas con el desarrollo de nuevas funcionalidades, mantenimiento y mejora del sistema. Esto incluye la creación y actualización de registros técnicos y el monitoreo del sistema.
- Interactúa con otros microservicios para realizar tareas de mantenimiento, y con el microservicio admin para recibir notificaciones sobre cambios de configuración o actualizaciones en el sistema.
<h2> Microservicio de Doctores  </h2>

- Gestiona las interacciones de los médicos con el sistema, permitiendo el acceso a los expedientes médicos de los pacientes, la gestión de citas médicas y el registro de diagnósticos o tratamientos, tambien puede interactuar con el sistema para registrar diagnósticos, prescripciones, etc.
- Se comunica con el microservicio de expedientes médicos, citas médicas y notificaciones para registrar y acceder a la información de los pacientes y notificar eventos importantes (como citas o cambios en el estado de los pacientes).
<h2> Microservicio de Enfermeras  </h2>

- Este microservicio se encargará de gestionar las tareas relacionadas con el personal de enfermería, como la asignación de pacientes a camas, administración de medicamentos y seguimiento de las condiciones de los pacientes.
- Se comunica con el microservicio de doctor para conocer el estado de los pacientes y colaborar en la administración de los mismos. Además, interactúa con el microservicio de notificaciones para recibir alertas relacionadas con la condición de los pacientes.
<h2> Microservicio de Redis  </h2>

- Este microservicio se utilizará para gestionar el almacenamiento en caché de datos, como sesiones de usuarios, información temporal y resultados de consultas frecuentes, mejorando el rendimiento del sistema al reducir la carga en las bases de datos.
- Interactúa principalmente con todos los microservicios que necesitan mejorar el rendimiento de lectura, como admin, doctor, y enfermera, almacenando en caché datos como la lista de pacientes o el estado de las citas.
<h2> Microservicio de MongoDB  </h2>

- Este microservicio gestionará el almacenamiento de datos no estructurados o semi-estructurados, como logs, información adicional de pacientes o datos de prueba. Se utilizará MongoDB como base de datos NoSQL para almacenar datos que no requieran una estructura rígida de tablas.
- Se comunica con otros microservicios para almacenar o consultar información relacionada con el sistema de salud, como logs de eventos o información adicional de pacientes.
- MongoDB para almacenamiento de datos NoSQL.

<h2> Endpoints de la API </h2>

## register_user
**URL (dirección):**  
`http://localhost:5001/admin/register`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correo": "juan.perez@example.com",
  "contrasena": "123",
  "id_rol": 1,
  "telefono": "55555555",
  "dpi": "1234567890123",
  "genero": "masculino",
  "direccion": "Calle Principal 123",
  "fecha_ingreso": "2023-11-11",
  "id_especialidad": 1,
  "fecha_vencimiento_colegiado": "2024-12-31",
  "estado": 1
}
```
Respuestas

- Código HTTP 201
```json
{
  "message": "Usuario registrado correctamente"
}
```
- Código HTTP 400
```json
{
  "Error": "Error en la integridad de la base de datos"
}
```
- Código HTTP 409
```json
{
  "Error": "El nombre de usuario o correo ya existen"
}
```

## login_user

**URL (dirección):**  
`http://localhost:5000/auth/login`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Content-Type: application/json`

**Cuerpo (PAYLOAD):**
```json
{
  "identificador": "maria.lopez@example.com",
  "contrasena": "mypass456"
}
```
Respuestas

- Código HTTP 201
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxMSwiaWRfcm9sIjoxLCJub21icmVfdXN1YXJpbyI6Im5vb29vbyJ9.0inzZBQLd5dFF41vdZwsituroIBv7ITOR2a_XAJTBe8"
}
```
- Código HTTP 401
```json
{
  "error": "Correo/DPI o contraseña son inválidos"
}
```
- Código HTTP 403
```json
{
  "error": "Estado desactivado. Usted ya no tiene permitido ingresar al sistema"
}
```

## dashboard para administrador

**URL (dirección):**  
`http://localhost:5000/admin/dashboard`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
    "message": "Welcome admin, user #numero usuario"
}
```

## dashboard para desarrollador

**URL (dirección):**  
`http://localhost:5000/desarrollador/dashboard`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
    "message": "Welcome desarrollador, user #numero usuario"
}
```

## Regresa los datos del usuario que se loguea actualmente

**URL (dirección):**  
`http://localhost:5000/auth/me`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
  "apellidos": "Pérez",
  "contrasena": "$2b$12$blNuKcn9hueP6xgGuKbNqeOtVdNOGBCEwqFj/APhPhAYmkGnj6Ks2",
  "correo": "juan.perez@example.com",
  "direccion": "Calle Principal 123",
  "dpi": "1234567890123",
  "estado": 1,
  "fecha_ingreso": "2023-11-11",
  "fecha_vencimiento_colegiado": "2024-12-31",
  "genero": "masculino",
  "id_especialidad": 1,
  "id_rol": 1,
  "id_usuario": 2,
  "nombres": "Juan",
  "telefono": "55555555"
}
```

## insertar_especialidad
**URL (dirección):**  
`http://localhost:5001/admin/insertar_especialidad`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"especialidad": "Anestesiologia"
}
```
Respuestas
- Código HTTP 200
```json
{
    "message": "Especialidad registrada Correctamente"
}
```
## obtener_especialidades
**URL (dirección):**  
`http://localhost:5001/admin/obtener_especialidades`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas

- Código HTTP 200
```json
{
	"especialidades": [
		{
			"especialidad": "Cardiologia",
			"id_especialidad": 1
		},
		{
			"especialidad": "Anestesiologia",
			"id_especialidad": 2
		}
	]
}
```
## actualizar_usuario
**URL (dirección):**  
`http://localhost:5001/admin/insertar_especialidad`

**Método HTTP:**  
`PUT`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
  "nombres": "MariaMODIFICADO",
  "apellidos": "LopézMODIFICADO",
  "correo": "maria.lopez@example.com",
  "contrasena": "12345",
  "telefono": "66666666",
  "dpi": "9876567890123",
  "direccion": "Calle Principal 123",
  "id_especialidad": 1,
  "fecha_vencimiento_colegiado": "2024-12-31"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Usuario modificado correctamente"
}
```
- Código HTTP 409
```json
{
	"Error": "El correo electronico ya existe"
}

{
	"Error": "El dpi no existe"
}
```

## eliminacion_usuario
**URL (dirección):**  
`http://localhost:5001/admin/eliminacion_usuario`

**Método HTTP:**  
`DELETE`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"dpi": "9876567890222"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Usuario Eliminado Correctamente"
}
```
- Código HTTP 409
```json
{
	"Error": "El DPI no existe"
}
```

## consulta_usuario
**URL (dirección):**  
`http://localhost:5001/admin/consulta_usuario`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"dpi": "9876567890123"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Usuario encontrado",
	"user": {
		"apellidos": "LopézMODIFICADO",
		"correo": "maria.lopez@example.com",
		"direccion": "Calle Principal 123",
		"dpi": "9876567890123",
		"especialidad": "Cardiologia",
		"fecha_ingreso": "Sat, 11 Nov 2023 00:00:00 GMT",
		"fecha_vencimiento_colegiado": "Tue, 31 Dec 2024 00:00:00 GMT",
		"genero": "Femenino",
		"nombres": "MariaMODIFICADO",
		"rol": 2,
		"telefono": "66666666"
	}
}
```
- Código HTTP 409
```json
{
	"Error": "El DPI no existe"
}
```

## insertar_area
**URL (dirección):**  
`http://localhost:5001/admin/insertar_area`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"nombre_area": "Cardiologia",
	"capacidad": 50
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Especialidad registrada Correctamente"
}
```
- Código HTTP 409
```json
{
	"Error": "Area ya existe"
}
```

## editar_area
**URL (dirección):**  
`http://localhost:5001/admin/editar_area`

**Método HTTP:**  
`PUT`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"nombre_area": "Vacunacion",
	"capacidad": 25,
	"nuevo_nombre_area" : "Pinchado"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Area editada Correctamente"
}
```
- Código HTTP 409
```json
{
	"Error": "Area no existe"
}
```
## editar_area
**URL (dirección):**  
`http://localhost:5001/admin/eliminar_area`

**Método HTTP:**  
`DELETE`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"nombre_area": "vacunacion"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Area Eliminada Correctamente"
}
```
- Código HTTP 409
```json
{
	"Error": "Area no existe"
}
```

## consultar_area
**URL (dirección):**  
`http://localhost:5001/admin/consultar_area`

**Método HTTP:**  
`DELETE`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"nombre_area": "Maternidad"
}
```
Respuestas 

- Código HTTP 200
```json
{
	"capacidad": 20,
	"nombre_area": "Maternidad"
}
```
- Código HTTP 409
```json
{
	"Error": "Area no existe"
}
```

## lista_usuarios
**URL (dirección):**  
`http://localhost:5001/admin/lista_usuarios`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas 

- Código HTTP 200
```json
{
	"message": "Usuario encontrado",
	"user": [
		{
			"apellidos": "Reyes Gonzalez",
			"correo": "eduardoalex2000@hotmail.com",
			"direccion": "Ciudad de Guatemala",
			"dpi": "3013805890101",
			"estado": 1,
			"fecha_ingreso": "Fri, 13 Dec 2024 00:00:00 GMT",
			"fecha_vencimiento_colegiado": null,
			"genero": "Masculino",
			"id_especialidad": null,
			"id_rol": 4,
			"id_usuario": 1,
			"nombres": "Eduardo Alexander",
			"telefono": "35958027"

		}
	]
}
```

## logs
**URL (dirección):**  
`http://localhost:5005/desarrollador/logs`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas 

- Código HTTP 200
```json
{
	"logs": [
		{
			"controlador": "Auth_Controller",
			"descripcion": "Exito. Login Exitoso",
			"function": "Login",
			"log_id": "20241216102053",
			"status": "INFO",
			"tipo": "Consulta"
		},
		{
			"controlador": "Auth_Controller",
			"descripcion": "Error. Correo/DPI o contraseña son inválidos",
			"function": "Login",
			"log_id": "20241216102050",
			"status": "ERROR",
			"tipo": "Consulta"
		},
		{
			"controlador": "Auth_Controller",
			"descripcion": "Exito. Login Exitoso",
			"function": "Login",
			"log_id": "20241216102041",
			"status": "INFO",
			"tipo": "Consulta"
		}
	]
}
```
- Código HTTP 404
```json
{
	"message": "No hay logs almacenados"
}
```
- Código HTTP 500
```json
{
	"error": "No se pudo conectar a la base de datos"
}
```

## crear_expediente
**URL (dirección):**  
`http://localhost:5004/mongo/crear_expediente`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "_id": "1234567890101",
    "Datos paciente": {
        "Fecha nacimiento": "15-01-2000",
        "Edad": 24,
        "Estado civil": "Soltero",
        "Ocupación u oficio": "Estudiante",
        "Profesión": "Estudiante",
        "Religion": "Evangelico",
        "Grupo sanguíneo": "O+",
        "Tipo de sangre": "O",
        "Grupo étnico": "Ladino",
        "Alfabeto": "Si",
        "Escolaridad": "Universitaria",
        "Procedencia": "Domicilio",
        "Contacto de emergencia": [
            {
                "Nombre": "Carlos Pérez",
                "Relación": "Hermano",
                "Teléfono": "555-8765"
            },
            {
                "Nombre": "Ana López",
                "Relación": "Madre",
                "Teléfono": "555-4321"
            }
        ]

    },
    "Antecedentes": {
        "Personales patológicos": {
            "Médicos": "Diabetes tipo 2 controlada con metformina.",
            "Quirúrgicos": "Cirugía de rodilla en 2016 debido a lesión deportiva.",
            "Traumáticos": "Fractura de pierna derecha en accidente de tráfico en 2020. Recibió tratamiento quirúrgico y rehabilitación.",
            "Alérgicos": "Alérgico al polen. Requiere antihistamínicos durante la temporada de alergias.",
            "Toxicomanías": "Fumador durante 10 años, dejó de fumar hace 2 años.",
            "Psiquiátricos": "Diagnóstico de depresión en 2017, tratada con terapia psicológica y medicación (antidepresivos).",
            "Transfusiones": "Recibió transfusión sanguínea después de una cirugía en 2016.",
            "Ginecológicos": "n/a",
            "Obstétricos": "n/a"
        },
        "Familiares patológicos": "Padre con hipertensión y diabetes tipo 2, madre con cáncer de mama diagnosticado a los 50 años.",
        "Personales no patológicos": {
            "Prenatal": "n/a",
            "Natal": "n/a",
            "Neonatal o postnatal": "n/a",
            "Crecimiento": "Crecimiento normal para su edad",
            "Desarrollo": "Comenzó a caminar a los 12 meses",
            "Inmunizaciones": "Vacunas completas según el calendario infantil.",
            "Alimentación": "Alimentación variada, en su mayoría equilibrada, consume poca comida rápida.",
            "Hábitos": "Hace ejercicio 3 veces a la semana, no consume alcohol ni drogas recreativas.",
            "Gineco-obstétricos": {
                "Menarquia": "Menarquia a los 12 años.",
                "Ciclos menstruales": "Ciclos regulares de 28 días.",
                "Última menstruación": "Última menstruación el 10 de diciembre de 2023.",
                "Edad y nombre de anticonceptivos/terapia hormonal": "No usa anticonceptivos, métodos naturales.",
                "Gestas": "0 gestas.",
                "Partos": "0 partos.",
                "Cesáreas": "0 cesáreas.",
                "Abortos": "0 abortos.",
                "Hijos vivos": "0 hijos vivos."
            }
        },
        "socio-personales": "Paciente vive con sus padres, en su tiempo libre disfruta de actividades al aire libre y leer."
    },
    "Historial de ingresos":[]	
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Documento insertado con ID: 1234567890101"
}
```
- Código HTTP 400
```json
{
	"error": "Ya existe un expediente del paciente con DPI: 2234567890101."
}
```

## nuevo_ingreso
**URL (dirección):**  
`http://127.0.0.1:5004/mongo/nuevo_ingreso`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "_id":"1234567890101",
    "contenido":{
        "FechaDeLaVisita": "2024-11-05",
        "MotivoDeLaVisita": "Dolor abdominal",
        "HistoriaDeLaVisitaActual": "Estaba jugando pelota, cuando le dio un dolor fuerte en la zona abdominal",
        "TipoDeVisita": "Consulta externa",
        "RevisionPorOrganosAparatosYSistemas": {
            "SintomasGenerales": "DolorAbdominal",
            "Piel": "Sin alteraciones",
            "Faneras": "Cabello sin alteraciones",
            "Cabeza": "Sin signos de trauma o alteracion",
            "Ojos": "No presenta alteraciones",
            "Oidos": "Sin signos de infeccion",
            "Nariz": "No presenta secreciones",
            "Boca": "Higiene adecuada, sin lesiones",
            "Garganta": "Sin signos de inflamacion",
            "Cuello": "Sin adenopatias",
            "Respiratorio": "Sin dificultad respiratoria",
            "Cardiovascular": "Ritmo regular, sin soplos",
            "Digestivo": "Dolor abdominal localizado en la region epigastrica",
            "Reproductor": "No relevante",
            "Genitourinario": "Sin alteraciones",
            "Endocrino": "Sin signos de alteracion",
            "MusculoEsqueletico": "Dolor en la zona abdominal",
            "Nervioso": "Sin deficit neurologico",
            "Linfatico": "Sin adenopatias palpables",
            "Hematopoyetico": "Sin signos de anemia",
            "PsiquiatricoAfecto": "Afecto adecuado"
        },
        "ExamenFisico": {
            "SignosVitales": {
                "TemperaturaEnC": "36.8",
                "RegionAnatomica": "Abdomen",
                "FrecuenciaRespiratoria": "16 respiraciones por minuto",
                "FrecuenciaCardiaca": "78 latidos por minuto",
                "FrecuenciaDePulso": "74 pulsaciones por minuto",
                "Perifericos": {
                    "Carotideo": "Normal",
                    "Radial": "Normal",
                    "Femoral": "Normal"
                },
                "PresionArterial": {
                    "BrazoDerecho": "120/80 mm/Hg",
                    "Posicion": "Sentado",
                    "BrazoIzquierdo": "118/78 mm/Hg",
                    "Posicion": "Sentado"
                },
                "Antropometria": {
                    "Peso": {
                        "Libras": "154",
                        "KG": "70"
                    },
                    "Talla": "1.72 m",
                    "CircunferenciaCefalica": "Normal",
                    "CircunferenciaAbdominal": "80 cm",
                    "IndiceMasaCorporal": "23.7"
                }
            },
            "InspeccionGeneral": "Paciente en buen estado general",
            "Piel": "Sin alteraciones, hidratada",
            "Faneras": "Cabello sano, unas sin alteraciones",
            "Cabeza": "Sin deformidades",
            "Ojos": {
                "AgudezaVisual": {
                    "ConLentes": {
                        "OjoDerecho": "20/20",
                        "OjoIzquierdo": "20/20",
                        "AmbosOjos": "20/20"
                    },
                    "SinLentes": {
                        "OjoDerecho": "20/25",
                        "OjoIzquierdo": "20/25",
                        "AmbosOjos": "20/25"
                    }
                }
            },
            "Oidos": "Sin secreciones, audicion normal",
            "Nariz": "No presenta secreciones o congestion",
            "Boca": "Mucosa bucal sana, sin lesiones",
            "Orofaringe": "Normal",
            "Cuello": "Sin adenopatias, libre de masas",
            "Linfaticos": "No se palpan adenopatias",
            "Torax": {
                "Anterior": "Simetrico, sin alteraciones",
                "Lateral": "Normal",
                "Posterior": "Normal"
            },
            "Mamas": "No se palpan masas",
            "Abdomen": "Dolor a la palpacion en la region epigastrica, sin signos de defensa",
            "GenitalesExternos": "Normales",
            "ExtremidadesSuperiores": "Sin edema, pulsos normales",
            "ExtremidadesInferiores": "Sin edema, pulsos normales",
            "RegionLumbosacra": "Sin alteraciones",
            "RegionPelvica": "Normal",
            "TactoRectal": "No realizado",
            "ExamenGinecologico": "No realizado",
            "ExamenNeurologico": "Reflejos normales, sin deficit motor o sensitivo",
            "ExamenMental": "Orientado en tiempo, espacio y persona"
        },
        "ListaInicialDeProblemas": {
            "Numero1": "Dolor abdominal agudo",
            "Numero2": "Posible lesion musculo-esqueletica",
            "Numero3": "Posible dispepsia",
            "Numero4": "Ninguno"
        },
        "DesarrolloDeProblemas": {
            "Fecha": "15-12-2024",
            "Hora": "10:00 AM",
            "NumeroYNombreDeCadaProblema": {
                "1": "Dolor abdominal agudo",
                "2": "Lesion musculo-esqueletica"
            }
        },
        "EvolucionDeProblemas": {
            "Fecha": "15-12-2024",
            "Hora": "10:00 AM",
            "NumeroYNombreDeCadaProblema": {
                "1": "Dolor abdominal controlado",
                "2": "Recuperacion parcial de la lesion"
            }
        },
        "Diagnostico": "Dolor abdominal agudo, probable distension muscular",
        "ProcedimientosRealizados": "Radiografia de abdomen, examen fisico, analisis de sangre",
        "TratamientoOPrescripcion": "Ibuprofeno 400mg cada 8 horas en caso de dolor, reposo relativo",
        "ResultadoDeLaVisita": "Dolor controlado con medicacion, sin signos de complicaciones",
        "MedicoResponsable": "Dr. Laura Gomez",
        "EspecialidadMedica": "Medicina General",
        "SeguimientoRecomendado": "Consulta de seguimiento en 1 semana",
        "ObservacionesAdicionales": "Evitar actividades fisicas intensas hasta la proxima consulta, seguir dieta ligera"
    }
}
```
Respuestas 

- Código HTTP 200
```json
{
	"message": "Ingreso insertado con exito"
}
```
- Código HTTP 409
```json
{
	"error": "No existe un expediente del paciente con DPI: 234567890101."
}
```

## crear_paciente
**URL (dirección):**  
`http://localhost:5001/admin/lista_pacientes`

`http://localhost:5003/enfermera/lista_pacientes`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
	"message": "Pacientes encontrados",
	"paciente": [
		{
			"apellido": "Lopéz",
			"direccion": "Calle Principal 123",
			"dpi": "9777578880222",
			"estado": "1",
			"fecha_nacimiento": "Sat, 11 Nov 2000 00:00:00 GMT",
			"genero": "Masculino",
			"id_area": 1,
			"id_paciente": 1,
			"nombre": "juana",
			"telefono": "66666666"
		}
	]
}
```
- Código HTTP 409
```json
{
	"Error": "Paciente no existe"
}
```

## obtener_expediente
**URL (dirección):**  
`http://localhost:5004/mongo/obtener_expediente`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Content-Type: application/json`

**Cuerpo (PAYLOAD):**  
```json
{
    "dpi": "7234567890101"
}
```
Respuestas
- Código HTTP 200
```json
{
	"expediente": {
		"_id": "7234567890101",
		"antecedentes": {
			"familiaresPatologicos": "Padre con hipertension y diabetes tipo 2, madre con cancer de mama diagnosticado a los 50 anos.",
			"personalesNoPatologicos": {
				"alimentacion": "Alimentacion variada, en su mayoria equilibrada, consume poca comida rapida.",
				"crecimiento": "Crecimiento normal para su edad",
				"desarrollo": "Comenzo a caminar a los 12 meses",
				"ginecoObstetricos": {
					"abortos": "0 abortos.",
					"anticonceptivos": "No usa anticonceptivos, metodos naturales.",
					"cesareas": "0 cesareas.",
					"ciclosMenstruales": "Ciclos regulares de 28 dias.",
					"gestas": "0 gestas.",
					"hijosVivos": "0 hijos vivos.",
					"menarquia": "Menarquia a los 12 anos.",
					"partos": "0 partos.",
					"ultimaMenstruacion": "Ultima menstruacion el 10 de diciembre de 2023."
				},
				"habitos": "Hace ejercicio 3 veces a la semana, no consume alcohol ni drogas recreativas.",
				"inmunizaciones": "Vacunas completas segun el calendario infantil.",
				"natal": "n/a",
				"neonatalPostnatal": "n/a",
				"prenatal": "n/a"
			},
			"personalesPatologicos": {
				"alergicos": "Alergico al polen. Requiere antihistaminicos durante la temporada de alergias.",
				"ginecologicos": "n/a",
				"medicos": "Diabetes tipo 2 controlada con metformina.",
				"obstetricos": "n/a",
				"psychiatricos": "Diagnostico de depresion en 2017, tratada con terapia psicologica y medicacion (antidepresivos).",
				"quirurgicos": "Cirugia de rodilla en 2016 debido a lesion deportiva.",
				"toxicomanias": "Fumador durante 10 anos, dejo de fumar hace 2 anos.",
				"transfusiones": "Recibio transfusion sanguinea despues de una cirugia en 2016.",
				"traumaticos": "Fractura de pierna derecha en accidente de trafico en 2020. Recibio tratamiento quirurgico y rehabilitacion."
			},
			"socioPersonales": "Paciente vive con sus padres, en su tiempo libre disfruta de actividades al aire libre y leer."
		},
		"contactoEmergencia": [
			{
				"nombre": "Carlos Perez",
				"relacion": "Hermano",
				"telefono": "555-8765"
			},
			{
				"nombre": "Ana Lopez",
				"relacion": "Madre",
				"telefono": "555-4321"
			}
		],
		"datosPaciente": {
			"alfabeto": "Si",
			"edad": 24,
			"escolaridad": "Universitaria",
			"estadoCivil": "Soltero",
			"fechaNacimiento": "15-01-2000",
			"grupoEtnico": "Ladino",
			"grupoSanguineo": "O+",
			"ocupacion": "Estudiante",
			"procedencia": "Domicilio",
			"profesion": "Estudiante",
			"religion": "Evangelico",
			"tipoSangre": "O"
		},
		"historialIngresos": [
			{
				"DesarrolloDeProblemas": {
					"Fecha": "15-12-2024",
					"Hora": "10:00 AM",
					"NumeroYNombreDeCadaProblema": {
						"1": "Dolor abdominal agudo",
						"2": "Lesion musculo-esqueletica"
					}
				},
				"Diagnostico": "Dolor abdominal agudo, probable distension muscular",
				"EspecialidadMedica": "Medicina General",
				"EvolucionDeProblemas": {
					"Fecha": "15-12-2024",
					"Hora": "10:00 AM",
					"NumeroYNombreDeCadaProblema": {
						"1": "Dolor abdominal controlado",
						"2": "Recuperacion parcial de la lesion"
					}
				},
				"ExamenFisico": {
					"Abdomen": "Dolor a la palpacion en la region epigastrica, sin signos de defensa",
					"Boca": "Mucosa bucal sana, sin lesiones",
					"Cabeza": "Sin deformidades",
					"Cuello": "Sin adenopatias, libre de masas",
					"ExamenGinecologico": "No realizado",
					"ExamenMental": "Orientado en tiempo, espacio y persona",
					"ExamenNeurologico": "Reflejos normales, sin deficit motor o sensitivo",
					"ExtremidadesInferiores": "Sin edema, pulsos normales",
					"ExtremidadesSuperiores": "Sin edema, pulsos normales",
					"Faneras": "Cabello sano, unas sin alteraciones",
					"GenitalesExternos": "Normales",
					"InspeccionGeneral": "Paciente en buen estado general",
					"Linfaticos": "No se palpan adenopatias",
					"Mamas": "No se palpan masas",
					"Nariz": "No presenta secreciones o congestion",
					"Oidos": "Sin secreciones, audicion normal",
					"Ojos": {
						"AgudezaVisual": {
							"ConLentes": {
								"AmbosOjos": "20/20",
								"OjoDerecho": "20/20",
								"OjoIzquierdo": "20/20"
							},
							"SinLentes": {
								"AmbosOjos": "20/25",
								"OjoDerecho": "20/25",
								"OjoIzquierdo": "20/25"
							}
						}
					},
					"Orofaringe": "Normal",
					"Piel": "Sin alteraciones, hidratada",
					"RegionLumbosacra": "Sin alteraciones",
					"RegionPelvica": "Normal",
					"SignosVitales": {
						"Antropometria": {
							"CircunferenciaAbdominal": "80 cm",
							"CircunferenciaCefalica": "Normal",
							"IndiceMasaCorporal": "23.7",
							"Peso": {
								"KG": "70",
								"Libras": "154"
							},
							"Talla": "1.72 m"
						},
						"FrecuenciaCardiaca": "78 latidos por minuto",
						"FrecuenciaDePulso": "74 pulsaciones por minuto",
						"FrecuenciaRespiratoria": "16 respiraciones por minuto",
						"Perifericos": {
							"Carotideo": "Normal",
							"Femoral": "Normal",
							"Radial": "Normal"
						},
						"PresionArterial": {
							"BrazoDerecho": "120/80 mm/Hg",
							"BrazoIzquierdo": "118/78 mm/Hg",
							"Posicion": "Sentado"
						},
						"RegionAnatomica": "Abdomen",
						"TemperaturaEnC": "36.8"
					},
					"TactoRectal": "No realizado",
					"Torax": {
						"Anterior": "Simetrico, sin alteraciones",
						"Lateral": "Normal",
						"Posterior": "Normal"
					}
				},
				"FechaDeLaVisita": "2024-11-05",
				"HistoriaDeLaVisitaActual": "Estaba jugando pelota, cuando le dio un dolor fuerte en la zona abdominal",
				"ListaInicialDeProblemas": {
					"Numero1": "Dolor abdominal agudo",
					"Numero2": "Posible lesion musculo-esqueletica",
					"Numero3": "Posible dispepsia",
					"Numero4": "Ninguno"
				},
				"MedicoResponsable": "Dr. Laura Gomez",
				"MotivoDeLaVisita": "Dolor abdominal",
				"ObservacionesAdicionales": "Evitar actividades fisicas intensas hasta la proxima consulta, seguir dieta ligera",
				"ProcedimientosRealizados": "Radiografia de abdomen, examen fisico, analisis de sangre",
				"ResultadoDeLaVisita": "Dolor controlado con medicacion, sin signos de complicaciones",
				"RevisionPorOrganosAparatosYSistemas": {
					"Boca": "Higiene adecuada, sin lesiones",
					"Cabeza": "Sin signos de trauma o alteracion",
					"Cardiovascular": "Ritmo regular, sin soplos",
					"Cuello": "Sin adenopatias",
					"Digestivo": "Dolor abdominal localizado en la region epigastrica",
					"Endocrino": "Sin signos de alteracion",
					"Faneras": "Cabello sin alteraciones",
					"Garganta": "Sin signos de inflamacion",
					"Genitourinario": "Sin alteraciones",
					"Hematopoyetico": "Sin signos de anemia",
					"Linfatico": "Sin adenopatias palpables",
					"MusculoEsqueletico": "Dolor en la zona abdominal",
					"Nariz": "No presenta secreciones",
					"Nervioso": "Sin deficit neurologico",
					"Oidos": "Sin signos de infeccion",
					"Ojos": "No presenta alteraciones",
					"Piel": "Sin alteraciones",
					"PsiquiatricoAfecto": "Afecto adecuado",
					"Reproductor": "No relevante",
					"Respiratorio": "Sin dificultad respiratoria",
					"SintomasGenerales": "DolorAbdominal"
				},
				"SeguimientoRecomendado": "Consulta de seguimiento en 1 semana",
				"TipoDeVisita": "Consulta externa",
				"TratamientoOPrescripcion": "Ibuprofeno 400mg cada 8 horas en caso de dolor, reposo relativo"
			}
		]
	},
	"message": "Expediente Obtenido"
}
```
Código HTTP 409
```json
{
	"error": "No existe un expediente del paciente con DPI: 72345678S90101."
}
```

[//]: <> (FASE 2)

## lista_pacientes
**URL (dirección):**  
`http://localhost:5001/admin/lista_pacientes`
`http://localhost:5005/desarrollador/lista_pacientes`
`http://localhost:5002/doctor/lista_pacientes`
`http://localhost:5003/enfermera/lista_pacientes`


**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
	"message": "Pacientes encontrados",
	"paciente": [
		{
			"apellido": "Lopéz",
			"direccion": "Calle Principal 123",
			"dpi": "9777578880222",
			"estado": "1",
			"fecha_nacimiento": "Sat, 11 Nov 2000 00:00:00 GMT",
			"genero": "Masculino",
			"id_area": 1,
			"id_paciente": 1,
			"nombre": "juana",
			"telefono": "66666666"
		}
	]
}
```

## eliminar_paciente
**URL (dirección):**  
`http://localhost:5001/admin/eliminar_paciente`


**Método HTTP:**  
`DELETE`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
	"dpi": "9777578880222"
}
```

Respuestas
- Código HTTP 200
```json
{
	"message": "Pacientes encontrados",
	"paciente": [
		{
			"apellido": "Lopéz",
			"direccion": "Calle Principal 123",
			"dpi": "9777578880222",
			"estado": "1",
			"fecha_nacimiento": "Sat, 11 Nov 2000 00:00:00 GMT",
			"genero": "Masculino",
			"id_area": 1,
			"id_paciente": 1,
			"nombre": "juana",
			"telefono": "66666666"
		}
	]
}
```
- Código HTTP 409
```json
{
	"Error": "Paciente no existe"
}
```

## lista_areas
**URL (dirección):**  
`http://localhost:5005/desarrollador/lista_area`
`http://localhost:5001/admin/lista_area`
`http://localhost:5002/doctor/lista_area`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200
```json
{
	"message": "Areas encontrados",
	"paciente": [
		{
			"cantidad_pacientes": 1,
			"capacidad": 50,
			"id_area": 1,
			"nombre_area": "Cardiologia"
		},
		{
			"cantidad_pacientes": 1,
			"capacidad": 20,
			"id_area": 4,
			"nombre_area": "Maternidad"
		}
	]
}
```

## consultar_area
**URL (dirección):**  
`http://localhost:5005/desarrollador/lista_area`
`http://localhost:5001/admin/lista_area`
`http://localhost:5002/doctor/lista_area`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "dpi": "7234567890101"
}
```

Respuestas
- Código HTTP 200

```json
{
	"message": "Areas encontrados",
	"paciente": [
		{
			"cantidad_pacientes": 1,
			"capacidad": 50,
			"id_area": 1,
			"nombre_area": "Cardiologia"
		},
		{
			"cantidad_pacientes": 1,
			"capacidad": 20,
			"id_area": 4,
			"nombre_area": "Maternidad"
		}
	]
}
```

## consultar_paciente
**URL (dirección):**  
`http://localhost:5005/desarrollador/consulta_paciente`
`http://localhost:5001/admin/consulta_paciente`
`http://localhost:5003/enfermera/consulta_paciente`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "dpi": "7234567890101"
}
```

Respuestas
- Código HTTP 200

```json
{
	"paciente": {
		"apellido": "Martinez",
		"direccion": "calle 5 zona 3",
		"dpi": "3333444440101",
		"estado": "1",
		"fecha_nacimiento": "Wed, 23 Feb 2000 00:00:00 GMT",
		"genero": "Masculino",
		"id_area": 1,
		"id_paciente": 2,
		"nombre": "Alex",
		"nombre_area": "Cardiologia",
		"telefono": "99998888"
	}
}
```
- Código HTTP 400

```json
{
	"Error": "paciente no existe"
}
```

## editar_paciente
**URL (dirección):**  
`http://localhost:5005/desarrollador/editar_paciente`
`http://localhost:5001/admin/editar_paciente`
`http://localhost:5002/doctor/editar_paciente`
`http://localhost:5003/enfermera/editar_paciente`

**Método HTTP:**  
`PUT`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "dpi": "7234567890101"
}
```
Respuestas
- Código HTTP 200

```json
{
  "nombre": "juanaMODIFICADO",
  "apellido": "Lopéz",
	"dpi": "9777578880222",
  "fecha_nacimiento": "2000-11-11",
	"telefono": "66666666",
	"direccion": "Calle Principal 123",
	"id_area" : 4
}
```
- Código HTTP 400

```json
{
	"Error": "Paciente no existe"
}
```


## pacientes_atendidos
**URL (dirección):**  
`http://localhost:5001/admin/pacientes-atendidos`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
[
    {
        "area": "Pediatría",
        "pacientes_atendidos": 15
    },
    {
        "area": "Urgencias",
        "pacientes_atendidos": 30
    },
    {
        "area": "Cirugía",
        "pacientes_atendidos": 10
    }
]
```


## diagnosticos_comunes
**URL (dirección):**  
`http://localhost:5001/admin/obtener-diagnosticos-comunes`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
    "diagnosticos": [
        {
            "diagnostico": "Cáncer de pulmón",
            "frecuencia": 15
        },
        {
            "diagnostico": "Neumonía",
            "frecuencia": 10
        }
    ]
}
```

## descargarPDF_area
**URL (dirección):**  
`http://localhost:5001/admin/descargarPDF_area`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
     "message":"No hay areas registradas"
}
```

## descargar_reporte_pacientes
**URL (dirección):**  
`http://localhost:5001/admin/descargar_reporte_pacientes`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
     "message":"No se encontraron pacientes"
}
```

## descargar_reporte_pacientes
**URL (dirección):**  
`http://localhost:5001/admin/descargar_reporte_diagnosticos`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
     "message":"No se encontraron diagnosticos comunes"
}
```

## descargarexcel_area
**URL (dirección):**  
`http://localhost:5001/admin/descargarexcel_area`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
     "message":"No hay areas registradas"
}
```

## descargar_reporte_pacientes_excel
**URL (dirección):**  
`http://localhost:5001/admin/descargar_reporte_pacientes_excel`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
     "message":"No hay pacientes registrados"
}
```

## modificar_expediente
**URL (dirección):**  
`http://localhost:5004/mongo/modificar_expediente`

**Método HTTP:**  
`PUT`

**Cabecera de Petición:**  
`Content-Type: application/json`

**Cuerpo (PAYLOAD):**  
```json
{
    "_id": "9777578880222",
    "datosPaciente": {
        "fechaNacimiento": "15-01-2000",
        "edad": 24,
        "estadoCivil": "Soltero",
        "ocupacion": "EstudianteMODIFICADO",
        "profesion": "Estudiante",
        "religion": "Evangelico",
        "grupoSanguineo": "O+",
        "tipoSangre": "O",
        "grupoEtnico": "Ladino",
        "alfabeto": "Si",
        "escolaridad": "Universitaria",
        "procedencia": "Domicilio"
    },
    "contactoEmergencia": [
        {"nombre": "CarlosMODIFICADO Perez", "relacion": "Hermano", "telefono": "555-8765"},
        {"nombre": "Ana Lopez",    "relacion": "Madre",   "telefono": "555-4321"}
    ],
    "antecedentes": {
        "personalesPatologicos": {
            "medicos": "Diabetes tipo 2 controlada con metformina.",
            "quirurgicos": "Cirugia de rodilla en 2016 debido a lesion deportiva.",
            "traumaticos": "Fractura de pierna derecha en accidente de trafico en 2020. Recibio tratamiento quirurgico y rehabilitacion.",
            "alergicos": "Alergico al polen. Requiere antihistaminicos durante la temporada de alergias.",
            "toxicomanias": "Fumador durante 10 anos, dejo de fumar hace 2 anos.",
            "psychiatricos": "Diagnostico de depresion en 2017, tratada con terapia psicologica y medicacion (antidepresivos).",
            "transfusiones": "Recibio transfusion sanguinea despues de una cirugia en 2016.",
            "ginecologicos": "n/a",
            "obstetricos": "n/a"
        },
        "familiaresPatologicos": "Padre con hipertension y diabetes tipo 2, madre con cancer de mama diagnosticado a los 50 anos.",
        "personalesNoPatologicos": {
            "prenatal": "n/a",
            "natal": "n/a",
            "neonatalPostnatal": "n/a",
            "crecimiento": "Crecimiento normal para su edad",
            "desarrollo": "Comenzo a caminar a los 12 meses",
            "inmunizaciones": "Vacunas completas segun el calendario infantil.",
            "alimentacion": "Alimentacion variada, en su mayoria equilibrada, consume poca comida rapida.",
            "habitos": "Hace ejercicio 3 veces a la semana, no consume alcohol ni drogas recreativas.",
            "ginecoObstetricos": {
                "menarquia": "Menarquia a los 12 anos.",
                "ciclosMenstruales": "Ciclos regulares de 28 dias.",
                "ultimaMenstruacion": "Ultima menstruacion el 10 de diciembre de 2023.",
                "anticonceptivos": "No usa anticonceptivos, metodos naturales.",
                "gestas": "0 gestas.",
                "partos": "0 partos.",
                "cesareas": "0 cesareas.",
                "abortos": "0 abortos.",
                "hijosVivos": "0 hijos vivos."
            }
        },
        "socioPersonales": "Paciente vive con sus padres, en su tiempo libre disfruta de actividades al aire libre y leer."
    },
    "historialIngresos": [],
    "notaCuidado": []   
}
```

Respuestas
- Código HTTP 200

```json
{
	"message": "Expediente del paciente con DPI 9777578880222 actualizado correctamente."
}
```

## agregar_notasCuidado
**URL (dirección):**  
`http://127.0.0.1:5004/mongo/agregar_notasCuidado`

**Método HTTP:**  
`PUT`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
    "_id":"9777578880222",
    "contenido":{
		"fecha": "2024-12-20T15:30:00Z",
		"responsable": "Dra. Ana López",
		"descripcion": "El paciente muestra signos de mejoría. Se recomienda continuar con el tratamiento actual y realizar monitoreo cada 4 horas.",
		"acciones": [
			"Administrar medicamento X cada 8 horas.",
			"Verificar presión arterial cada 4 horas.",
			"Reevaluación en 24 horas."
		],
		"observaciones": "Paciente estable. Sin complicaciones durante la última evaluación."
	}
}
```

Respuestas
- Código HTTP 200

```json
{
     "message": "Expediente del paciente con DPI 9777578880222 actualizado correctamente."
}
```


## paciente_sin_area
**URL (dirección):**  
`http://localhost:5001/admin/paciente_sin_area`
`http://localhost:5005/desarrollador/paciente_sin_area`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
   "pacientes_sin_area":[
      {
         "id_paciente":1,
         "nombre":"Juan",
         "apellido":"Pérez",
         "dpi":"1234567890101",
         "genero":"Masculino",
         "fecha_nacimiento":"1990-01-01",
         "telefono":"55555555",
         "direccion":"Zona 1, Ciudad"
      },
      {
         "id_paciente":2,
         "nombre":"María",
         "apellido":"González",
         "dpi":"1098765432101",
         "genero":"Femenino",
         "fecha_nacimiento":"1985-05-15",
         "telefono":"44444444",
         "direccion":"Zona 3, Ciudad"
      }
   ]
}
```

## listado_enfermeras
**URL (dirección):**  
`http://localhost:5001/admin/enfermeras`
`http://localhost:5005/desarrollador/enfermeras`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
   "enfermeras":[
      {
         "apellidos":"Cutzal Chalí",
         "correo":"cutzalluis@gmail.com",
         "direccion":"Ciudad de Guatemala",
         "dpi":"2842258270404",
         "genero":"Masculino",
         "id_usuario":3,
         "nombres":"Luis Antonio",
         "telefono":"41201792"
      }
   ]
}
```

## listado_doctores
**URL (dirección):**  
`http://localhost:5001/admin/enfermeras`
`http://localhost:5005/desarrollador/enfermeras`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
   "doctores":[
      {
         "apellidos":"Martin Francisco",
         "correo":"pedromartinf07@gmail.com",
         "direccion":"Ciudad de Guatemala",
         "dpi":"2574151141308",
         "fecha_vencimiento_colegiado":"2050-01-01",
         "genero":"Masculino",
         "id_usuario":2,
         "nombres":"Pedro",
         "telefono":"46664955"
      }
   ]
}
```

## agregar_paciente_area
**URL (dirección):**  
`http://localhost:5001/admin/agregar_paciente_area`
`http://localhost:5005/desarrollador/agregar_paciente_area`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
```json
{
   "id_paciente":1,
   "id_area":1,
   "id_enfermera":3,
   "id_doctor":2
}
```

Respuestas
- Código HTTP 200

```json
{
"message": "Paciente asignado a área, enfermera y doctor exitosamente"
}
```

## ultimos_pacientes_ingresados
**URL (dirección):**  
`http://localhost:5001/admin/ultimos_pacientes_ingresados`
`http://localhost:5005/desarrollador/ultimos_pacientes_ingresados`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
   "pacientes":[
      {
         "apellido":"Pérez",
         "direccion":"Calle 123, Zona 1, Ciudad",
         "dpi":"1234567891234",
         "estado":"1",
         "fecha_insercion":"2024-12-24 11:15:04",
         "fecha_nacimiento":"Wed, 15 May 1985 00:00:00 GMT",
         "genero":"M",
         "id_area":1,
         "id_paciente":1,
         "nombre":"Juan",
         "telefono":"12345678"
      }
   ]
}
```

## send-email
**URL (dirección):**  
`http://localhost:5006/send-email`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Content-Type: application/json`

**Cuerpo (PAYLOAD):**  
```json
{
	"to": "destino@gmail.com",
	"nombre": "Eduardo Reyes",
	"fecha_vencimiento":"31-02-2024"
}
```

Respuestas
- Código HTTP 200

```json
{
	"message": "Correo enviado exitosamente.",
	"info": {
		"accepted": [
			"eduardoreyes135790@gmail.com"
		],
		"rejected": [],
		"ehlo": [
			"SIZE 5242880",
			"PIPELINING",
			"ENHANCEDSTATUSCODES",
			"8BITMIME",
			"DSN",
			"AUTH PLAIN LOGIN CRAM-MD5"
		],
		"envelopeTime": 599,
		"messageTime": 688,
		"messageSize": 3263,
		"response": "250 2.0.0 Ok: queued",
		"envelope": {
			"from": "admin@hospital.com",
			"to": [
				"eduardoreyes135790@gmail.com"
			]
		},
		"messageId": "<92123622-43d3-55ba-5667-6eba072e5c99@hospital.com>"
	}
}
```
- Código HTTP 500

```json
{ 
      "error": "No se pudo enviar el correo." 
}
```

## DarDeAlta
**URL (dirección):**  
`http://localhost:5002/doctor/DarDeAlta/<int:id_paciente>`

**Método HTTP:**  
`DELETE`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
"message": "El paciente con ID 1 ha sido dado de alta exitosamente. Se eliminaron todas las referencias."
}
```

## listadpPacientes_asignados
**URL (dirección):**  
`http://localhost:5002/doctor/listadpPacientes_asignados`

**Método HTTP:**  
`GET`

**Cabecera de Petición:**  
`Authorization: Bearer <token>`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
   "pacientes_asignados":[
      {
         "id_paciente":1,
         "nombre":"Juan",
         "apellido":"Pérez",
         "dpi":"123456789",
         "genero":"Masculino",
         "fecha_nacimiento":"1985-06-15",
         "telefono":"555123456",
         "direccion":"Calle Ficticia 123",
         "estado":"Activo",
         "area":"Cardiología"
      },
      {
         "id_paciente":2,
         "nombre":"María",
         "apellido":"Gómez",
         "dpi":"987654321",
         "genero":"Femenino",
         "fecha_nacimiento":"1990-02-20",
         "telefono":"555654321",
         "direccion":"Avenida Real 456",
         "estado":"Activo",
         "area":"Pediatría"
      }
   ]
}
```

- Código 200

```json
{
"pacientes_asignados": "No hay pacientes asignados."
}
```

## crear_backups
**URL (dirección):**  
`http://localhost:5004/mongo/crear_backups`

**Método HTTP:**  
`POST`

**Cabecera de Petición:**  
`Content-Type: application/json`

**Cuerpo (PAYLOAD):**  
*(No se requiere payload para esta petición)*

Respuestas
- Código HTTP 200

```json
{
	"file_mongo_id": "1rdunMiESWgYQ6k9npB7VEVTHFI6mC1Yq",
	"file_redis_id": "",
	"file_sql_id": "1MeEReTB6NAWhztzDilM4Tdkiy0OKfm7j",
	"mongo_status": "EXITO",
	"redis_status": "EXITO",
	"sql_status": "EXITO"
}
```



<h2> Diagrama de Arquitectura del Backend </h2>

![Imagen microservicios Backend](img_manual/servicios.png)

<h2> Escalabilidad y Mantenimiento </h2>

- La arquitectura de microservicios permitirá la escalabilidad horizontal de cada servicio de forma independiente, según la carga de trabajo y la demanda.
- Cada microservicio puede ser desplegado, actualizado o mantenido de manera independiente, lo que facilitará las actualizaciones rápidas sin afectar a otros servicios del sistema.

<h1> Estructura del Frontend </h1>

```
C:.
|   .env                         # Archivo de configuración de variables de entorno.
|   .gitignore                   # Define qué archivos y carpetas ignorar en Git.
|   eslint.config.js             # Configuración para ESLint (análisis estático del código).
|   estructura.txt               # Archivo que describe la estructura del proyecto.
|   index.html                   # Punto de entrada principal para la aplicación React.
|   package-lock.json            # Archivo que asegura la consistencia de dependencias instaladas.
|   package.json                 # Configuración de dependencias y scripts del proyecto.
|   postcss.config.js            # Configuración de PostCSS para procesamiento de estilos.
|   README.md                    # Documentación general del proyecto.
|   tailwind.config.js           # Configuración de Tailwind CSS.
|   vite.config.js               # Configuración de Vite (entorno de desarrollo rápido).
|
+---public                       # Archivos estáticos públicos que no requieren procesamiento.
|       vite.svg                 # Ícono o logo utilizado en la app.
|       
\---src                          # Código fuente principal del proyecto.
    |   App.jsx                  # Componente principal que organiza toda la aplicación.
    |   index.css                # Estilos globales de la aplicación.
    |   main.jsx                 # Punto de entrada para renderizar la aplicación React.
    |   
    +---assets                   # Recursos estáticos como imágenes, logos, etc.
    |       react.svg            # Logo de React.
    |       
    +---components               # Componentes reutilizables y específicos.
    |   +---admin                # Componentes específicos para la sección de administrador.
    |   |       NewUserForm.jsx  # Formulario para agregar nuevos usuarios.
    |   |       UserTable.jsx    # Tabla que muestra una lista de usuarios.
    |   |       
    |   +---auth                 # Componentes relacionados con la autenticación.
    |   |       LoginForm.jsx    # Formulario de inicio de sesión.
    |   |       
    |   +---dev                  # Componentes para desarrolladores.
    |   |       LogVitacore.jsx  # Registro de logs o actividad para desarrolladores.
    |   |       
    |   +---shared               # Componentes reutilizables entre distintas partes de la app.
    |   |       ErrorBoundary.jsx # Manejo global de errores.
    |   |       Header.jsx        # Componente de cabecera común.
    |   |       Modal.jsx         # Componente de ventana modal reutilizable.
    |   |       Sidebar.jsx       # Barra lateral de navegación.
    |   |       SidebarLink.jsx   # Enlace reutilizable dentro de la barra lateral.
    |   |       
    |   \---user                 # Componentes para manejar la administración de usuarios.
    |           DeleteConfirmationModal.jsx # Modal de confirmación para eliminar usuarios.
    |           EditUserModal.jsx           # Modal para editar la información de un usuario.
    |           ViewUserModal.jsx           # Modal para visualizar detalles del usuario.
    |           
    +---context                  # Contextos de React para manejo global de estados.
    |       AuthContext.jsx      # Contexto para manejar el estado de autenticación.
    |       
    +---hooks                    # Hooks personalizados de React.
    |       useAuth.jsx          # Hook para acceder y manejar la autenticación del usuario.
    |       
    +---layouts                  # Layouts para secciones específicas de la aplicación.
    |       AdminLayout.jsx      # Layout de la sección de administrador.
    |       DeveloperLayout.jsx  # Layout de la sección de desarrollador.
    |       DoctorLayout.jsx     # Layout de la sección de doctor.
    |       Layout.jsx           # Layout general compartido.
    |       NurseLayout.jsx      # Layout de la sección de enfermera.
    |       
    +---pages                    # Páginas principales de la aplicación.
    |   |   LoginPage.jsx        # Página de inicio de sesión.
    |   |   NotFound.jsx         # Página para errores 404 (ruta no encontrada).
    |   |   SimplePage.jsx       # Página genérica para pruebas o secciones simples.
    |   |   Unauthorized.jsx     # Página para accesos no autorizados.
    |   |   
    |   +---admin                # Páginas relacionadas con la sección de administrador.
    |   |       PageAdminDashboard.jsx # Página principal del panel de administración.
    |   |       UserView.jsx           # Página para la visualización de usuarios.
    |   |       
    |   \---user                 # (Pendiente) Otras páginas relacionadas con el usuario.
    |   
    +---routes                   # Configuración de rutas para la aplicación.
    |       AppRoutes.jsx        # Rutas principales de la aplicación.
    |       PrivateRoute.jsx     # Ruta protegida que requiere autenticación.
    |       
    +---services                 # Servicios para conectar con el backend.
    |       adminServices.jsx    # Servicios para las funciones del administrador.
    |       authUserService.jsx  # Servicios para la autenticación de usuarios.
    |       developerService.jsx # Servicios para los desarrolladores.
    |       userServices.jsx     # Servicios relacionados con operaciones de usuarios.
    |       
    +---test                     # Archivos para pruebas unitarias o de datos.
    |       testData.tsx         # Datos de prueba o mock utilizados en las pruebas.
    |       
    \---utilities                # Utilidades o helpers reutilizables en el proyecto.
```
<h2> Explicación General </h2>

- .env: Configuran las variables de entorno, tener en cuenta que los puertos:5000,5001,5002,5003,5004,5005 son para: AUTH, ADMIN, DOCTOR, ENFERMERA, MONGO=5004 y DESARROLLADOR respectivamente.
- public/: Contiene archivos estáticos que no requieren procesamiento
- src/
- assets/: Imágenes y recursos estáticos.
- components/: Componentes reutilizables y específicos para cada rol o sección.
- context/: Contextos para manejar estados globales.
- hooks/: Hooks personalizados de React.
- layouts/: Diseños específicos para cada sección de usuario.
- pages/: Vistas completas que representan una página.
- routes/: Definición de rutas y protección de accesos.
- services/: Archivos para consumir APIs del backend.
- test/: Datos o pruebas unitarias.
- utilities/: Funciones de utilidad reutilizables.

<h1> Gestión de Usuarios y Roles </h1>

- login: Pantalla de inicio de sesión donde los usuarios ingresan sus credenciales para acceder al sistema.

![Imagen login](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.42.48_408c37e0.jpg)

- Administrador

![Imagen administrador](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.43.28_2cd928fa.jpg)

- Creación de Usuarios

![Imagen creacion de usuarios](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.44.54_7c328aff.jpg)

- Lista de usuarios

![Imagen lista de usuarios](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.45.18_9c81404c.jpg)

- Detalles de usuario

![Imagen detalles usuario](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.45.32_ff8aeeec.jpg)

- Editar usaurio

![Imagen editar usuario](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.45.45_0af16162.jpg)

- Eliminar usuario

![Imagen eliminar usuario](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.46.00_5c1a6931.jpg)

- Funciones del administrador

![Imagen funciones admin](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.46.24_649d3b38.jpg)

- Dashboard y funciones del Doctor

![Imagen doctor](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.51.40_90931c0c.jpg)

- Dashboard y funciones de la Enfermera

![Imagen enfermera](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.52.34_8de380e2.jpg)

- Dashboard y funciones del Developer

![Imagen developer](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2019.53.08_b98804ef.jpg)

- Logs

![Imagen logs](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2020.13.31_2e99b6b4.jpg)

- Creacion de expediente

![Imagen logs](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2023.12.27_367d224a.jpg)
![Imagen logs](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2023.13.05_3ebb6faf.jpg)
![Imagen logs](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2023.13.37_259d6f65.jpg)
![Imagen logs](img_manual/Imagen%20de%20WhatsApp%202024-12-16%20a%20las%2023.14.05_ae42ca65.jpg)

<h1> Modelo entidad relacion </h1>

![Imagen ER](img_manual/Captura%20de%20pantalla%202024-12-26%20181236.png)

- Script de la base de datos.

```sql
CREATE DATABASE BD2_ProyectoG2;
USE BD2_ProyectoG2;

CREATE TABLE Especialidad (
    id_especialidad INT PRIMARY KEY IDENTITY(1,1),
    especialidad VARCHAR(100) NOT NULL
);

CREATE TABLE rol(
	id_rol INT PRIMARY KEY IDENTITY (1,1),
	nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
	id_usuario INT PRIMARY KEY IDENTITY(1,1),
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	correo VARCHAR(150) UNIQUE NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	id_rol INT NOT NULL,
	telefono VARCHAR(15) NULL,
	dpi VARCHAR(13) UNIQUE NOT NULL,
	genero VARCHAR(10) NOT NULL,
	direccion TEXT NULL,
	fecha_ingreso DATE NOT NULL,
	id_especialidad INT NULL,
	fecha_vencimiento_colegiado DATE NULL,
	estado INT NOT NULL,
	FOREIGN KEY (id_especialidad) REFERENCES Especialidad(id_especialidad),
	FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE ContactoEmergencia (
    id_contacto INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL FOREIGN KEY REFERENCES Usuario(id_usuario),
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL
);

CREATE TABLE Area(
	id_area INT PRIMARY KEY IDENTITY(1,1),
	nombre_area VARCHAR(150) UNIQUE NOT NULL,
	capacidad INT NOT NULL
);

CREATE TABLE Paciente(
	id_paciente INT PRIMARY KEY IDENTITY(1,1),
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	dpi VARCHAR(13) UNIQUE NOT NULL,
	genero VARCHAR(10) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	telefono VARCHAR(15) NULL,
	direccion TEXT NULL,
	id_area INT NOT NULL,
	estado VARCHAR(50) NOT NULL,
	FOREIGN KEY (id_area) REFERENCES Area(id_area)
);

CREATE TABLE AreaUsuario(
	id_area INT,
	id_usuario INT,
	FOREIGN KEY (id_area) REFERENCES Area(id_area),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE PacienteEnfermera(
	id_paciente INT,
	id_usuario INT,
	FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
```

*NOTA: La tabla PacienteEnfermera se utilizara para PacienteDoctor*

- En el proceso de integrar triggers que registren automáticamente las operaciones de insert, update y delete en las tablas históricas UsuarioHistorico y PacienteHistorico, se identificó la necesidad de realizar modificaciones en las tablas principales Usuario y Paciente. Estas modificaciones fueron necesarias para garantizar el correcto funcionamiento y la coherencia de los triggers, respetando la integridad de los datos y el propósito del sistema.
```sql
ALTER TABLE Usuario
ALTER COLUMN direccion NVARCHAR(MAX);

ALTER TABLE Paciente
ALTER COLUMN direccion NVARCHAR(MAX);
```

- Con el objetivo de garantizar un control riguroso y transparente sobre los datos, se han implementado tres nuevas tablas históricas en la base de datos: AreaHistorico, PacienteHistorico y UsuarioHistorico. Estas tablas están diseñadas para registrar cada operación de inserción, actualización o eliminación realizada en las tablas principales correspondientes.
```sql
CREATE TABLE AreaHistorico(
	id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_area INT ,
	nombre_area VARCHAR(150) NOT NULL,
	capacidad INT NOT NULL
);

CREATE TRIGGER trg_area_cambios
ON Area
AFTER INSERT, UPDATE, DELETE
AS BEGIN
    SET NOCOUNT ON;
    
    -- INSERT
    IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
    BEGIN 
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'INSERT' AS tipo_modificacion,
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM inserted;
    END
    
    -- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'UPDATE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'DELETE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM deleted;
    END
END;

CREATE TABLE PacienteHistorico(
    id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_paciente INT ,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	dpi VARCHAR(13)  NOT NULL,
	genero VARCHAR(10) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	telefono VARCHAR(15) NULL,
	direccion NVARCHAR(MAX) NULL,
	id_area INT NOT NULL,
	estado VARCHAR(50) NOT NULL,
	FOREIGN KEY (id_area) REFERENCES Area(id_area)
);
CREATE TRIGGER trg_paciente_cambios
ON Paciente
AFTER INSERT, UPDATE, DELETE
AS BEGIN
    SET NOCOUNT ON;
    
    -- INSERT
    IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
    BEGIN 
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'INSERT' AS tipo_modificacion,
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM inserted;
    END
    
    -- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'UPDATE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'DELETE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM deleted;
    END
END;

CREATE TABLE UsuarioHistorico (
	id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_usuario INT,
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	correo VARCHAR(150) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	id_rol INT NOT NULL,
	telefono VARCHAR(15) NULL,
	dpi VARCHAR(13) NOT NULL,
	genero VARCHAR(10) NOT NULL,
	direccion VARCHAR(MAX) NULL,
	fecha_ingreso DATE NOT NULL,
	id_especialidad INT NULL,
	fecha_vencimiento_colegiado DATE NULL,
	estado INT NOT NULL
);

CREATE TRIGGER trg_usuario_cambios
on Usuario
AFTER INSERT, UPDATE, DELETE
AS BEGIN
	SET NOCOUNT ON;
	--INSERT
	IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
	BEGIN 
		INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
		SELECT
		'INSERT' AS tipo_modificacion,
        GETDATE() AS fecha_insercion,
		id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
		FROM inserted;
	END
	-- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
        SELECT 
            'UPDATE' AS tipo_modificacion, -- Indica el tipo de operación
            GETDATE() AS fecha_insercion,
            id_usuario,nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
        SELECT 
            'DELETE' AS tipo_modificacion, -- Indica el tipo de operación
            GETDATE() AS fecha_insercion,
            id_usuario,nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
        FROM deleted;
    END
END
```
- Esta implementación no solo mejora la administración y seguridad de la información, sino que también refleja nuestro compromiso con la transparencia y la confiabilidad en el manejo de datos sensibles.

<h1> Gestion de expedientes </h1>

Los expedientes médicos estarán almacenados en MongoDB en formato JSON, su estructura es la siguiente:


```json
{
  "Datos paciente": {
    "nombres y apellidos": "",
    "Fecha nacimiento": "día-mes-año",
    "Edad": 12,
    "sexo": "M",
    "Estado civil": "",
    "Ocupación u oficio": "",
    "Profesión": "",
    "Grupo étnico": "",
    "Escolaridad": "",
    "Procedencia": "",
    "Dirección": "",
    "Teléfono de contacto": "",
    "Correo": "",
    "Responsable": "",
    "Lista inicial de problemas": {
      "numero1": "",
      "numero2": "",
      "numero3": "",
      "numero4": ""
    }
  },
  "Motivo consulta": "",
  "Historia de enfermedad actual": "",
  "Antecedentes": {
    "Personales patológicos": {
      "Médicos": "",
      "Quirúrgicos": "",
      "Traumáticos": "",
      "Alérgicos": "",
      "Toxicomanías": "",
      "Psiquiátricos": "",
      "Transfusiones": "",
      "Ginecológicos": "",
      "Obstétricos": ""
    },
    "Familiares patológicos": "",
    "Personales no patológicos": {
      "Prenatal": "",
      "Natal": "",
      "Neonatal o postnatal": "",
      "Crecimiento": "",
      "Desarrollo": "",
      "Inmunizaciones": "",
      "Alimentación": "",
      "Hábitos": "",
      "Gineco-obstétricos": {
        "Menarquia": "",
        "Ciclos menstruales": "",
        "Última menstruación": "",
        "Edad y nombre de anticonceptivos/terapia hormonal": "",
        "Gestas": "",
        "Partos": "",
        "Cesáreas": "",
        "Abortos": "",
        "Hijos vivos": ""
      }
    },
    "socio-personales": ""
  },
  "Revisión por órganos, aparatos y sistemas": {
    "Síntomas generales": "",
    "Piel": "",
    "Faneras": "",
    "Cabeza": "",
    "Ojos": "",
    "Oídos": "",
    "Nariz": "",
    "Boca": "",
    "Garganta": "",
    "Cuello": "",
    "Respiratorio": "",
    "Cardiovascular": "",
    "Digestivo": "",
    "Reproductor": "",
    "Genitourinario": "",
    "Endocrino": "",
    "Músculo-esquelético": "",
    "Nervioso": "",
    "Linfático": "",
    "Hematopoyético": "",
    "Psiquiátrico (afecto)": ""
  },
  "Examen físico": {
    "signos vitales": {
      "Temperatura en °C": 55,
      "Región anatómica": "",
      "Frecuencia respiratoria": "",
      "Frecuencia cardíaca": "",
      "Frecuencia de pulso": "",
      "Periféricos": {
        "Carotídeo": "",
        "Radial": "",
        "Femoral": ""
      },
      "Presión arterial": {
        "Brazo derecho": " mm/Hg",
        "Posición": "",
        "Brazo izquierdo": " mm/Hg",
        "Posición": ""
      },
      "Antropometría": {
        "Peso": {
          "libras": "",
          "KG": ""
        },
        "Talla": "",
        "Circunferencia cefálica": "",
        "Circunferencia abdominal": "",
        "Índice masa corporal": ""
      }
    },
    "Inspección general": "",
    "Piel": "",
    "Faneras": "",
    "Cabeza": "",
    "Ojos": {
      "Agudeza visual": {
        "Con lentes": {
          "Ojo derecho": "",
          "Ojo izquierdo": "",
          "Ambos ojos": ""
        },
        "Sin lentes": {
          "Ojo derecho": "",
          "Ojo izquierdo": "",
          "Ambos ojos": ""
        }
      }
    },
    "Oídos": "",
    "Nariz": "",
    "Boca": "",
    "Orofaringe": "",
    "Cuello": "",
    "Linfáticos": "",
    "Tórax": {
      "Anterior": "",
      "Lateral": "",
      "Posterior": ""
    },
    "Mamas": "",
    "Abdomen": "",
    "Genitales externos": "",
    "Extremidades superiores": "",
    "Extremidades inferiores": "",
    "Región lumbosacra": "",
    "Región pélvica": "",
    "Tacto rectal": "",
    "Examen ginecológico": "",
    "Examen neurológico": "",
    "Examen mental": ""
  },
  "Lista inicial de problemas": {
    "Fecha": "",
    "Hora": "",
    "Número y nombre de cada problema": {}
  },
  "Desarrollo de problemas": {
    "Fecha": "",
    "Hora": "",
    "Número y nombre de cada problema": {}
  },
  "Evolución de problemas": {
    "Fecha": "",
    "Hora": "",
    "Número y nombre de cada problema": {}
  }
}
```
<h2> Beneficios de MongoDB en la Gestión de Expedientes </h2>

- Flexibilidad: Facilita el manejo de información heterogénea, como registros de alergias, antecedentes familiares y vacunas
- Consultas Rápidas: Indexación y búsquedas eficientes sobre los datos.
- Escalabilidad Horizontal: Ideal para sistemas hospitalarios con grandes volúmenes de datos.
- Historial Completo: Permite almacenar múltiples registros médicos en un solo documento de manera ordenada.

<h1> Bitácora y Gestión de Errores </h1>
Se han implementado dos archivos principales para la gestión de la bitácora

- Módulo de Conexión con Redis: Se encarga de establecer y manejar la conexión con el servidor Redis
``` python
import redis
import os
from dotenv import load_dotenv

load_dotenv()

class RedisClient:
    def __init__(self):
        self.host = os.getenv("REDIS_HOST", "localhost")
        self.port = int(os.getenv("REDIS_PORT", 6379))
        self.password = os.getenv("REDIS_PASSWORD", None)
        self.client = None

    def connect(self):
        try:
            self.client = redis.StrictRedis(
                host=self.host, 
                port=self.port, 
                password=self.password, 
                decode_responses=True
            )
            self.client.ping()
            print("Conexión a Redis exitosa!")
        except redis.ConnectionError as e:
            print(f"Error al conectar con Redis: {e}")
            raise e

    def get_client(self):
        if not self.client:
            self.connect()
        return self.client
```

- Gestión de Logs: proporciona funcionalidades para manejar los logs y errores del sistema.
```python
import json
import sys
import os
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)
from REDIS.dbRedis import RedisClient
from datetime import datetime

redis_client = RedisClient()
def save_log_json(json_data):
    try:
        data = json.loads(json_data)
    except json.JSONDecodeError as e:
        raise ValueError(f"El JSON proporcionado no es válido: {e}")
    
    log_id = datetime.now().strftime('%Y%m%d%H%M%S')
    data = json.loads(json_data)
    log_data = {"log_id": log_id}
    log_data.update(data) 

    client = redis_client.get_client()
    if not client:
        raise ConnectionError("No se pudo Conectar a Redis.")
    client.set(log_id, json.dumps(log_data))

def save_log_param(tipo, status, function, controlador, descripcion):
    try:
        log_id = datetime.now().strftime('%Y%m%d%H%M%S')
        log_data = {
                "log_id": log_id,
                "tipo": tipo,
                "status": status,
                "function": function,
                "controlador": controlador,
                "descripcion": descripcion
            }
        client = redis_client.get_client()
        if not client:
            raise ConnectionError("No se pudo Conectar a Redis.")
        client.set(log_id, json.dumps(log_data))
    except Exception as e:
        print("Ocurrio un error inseperado: " +str(e))

def get_log():
    try:
        client = redis_client.get_client()
        if not client:
            raise ConnectionError("No se pudo Conectar a Redis.")
        keys = client.keys('*')
        if not keys:
            return json.dumps({"message": "No hay logs almacenados"})
        logs = client.mget(keys)
        decoded_logs = [json.loads(log) for log in logs]
        return json.dumps({"logs": decoded_logs})
    except Exception as e:
        return json.dumps({"error": str(e)})
    
def delete_log():
    try:
        client = redis_client.get_client()
        client.flushdb()
        return json.dumps({"message": "Todos los logs han sido eliminados exitosamente"})
    except Exception as e:
        return json.dumps({"error": str(e)})
```

- Ejemplo de entrada
```json
{
    "tipo": "Error",
    "status": "500",
    "function": "create_user",
    "controlador": "auth_controller",
    "descripcion": "No se pudo insertar el usuario en la base de datos"
}
```

- Respuesta

```json
{
    "logs": [
        {
            "log_id": "20240605123000",
            "tipo": "Error",
            "status": "500",
            "function": "create_user",
            "controlador": "auth_controller",
            "descripcion": "No se pudo insertar el usuario en la base de datos"
        }
    ]
}
```
- Para los usuarios: Administradores y Doctores se creo un sistema de correos electronicos para enviar notificaciones

```js
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const app = express();
const CORREO_PORT = process.env.CORREO_PORT || 5006;
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { to,nombre,fecha_vencimiento } = req.body;
    if (!to) {
        return res.status(400).json({ error: "El campo 'to' es requerido." });
    }
    if (!nombre) {
        return res.status(400).json({ error: "El campo 'nombre' es requerido." });
    }
    if (!fecha_vencimiento) {
        return res.status(400).json({ error: "El campo 'fecha_vencimiento' es requerido." });
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio de Pago</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #eaeaea;
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
        }
        .email-body p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .email-body a {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .email-body a:hover {
            background-color: #0056b3;
        }
        .email-footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Recordatorio de Pago</h1>
        </div>
        <div class="email-body">
            <p>Estimado/a: <strong>${nombre}</strong>,</p>
            <p>Le recordamos que debe realizar el pago de su colegiado para mantener activa su membresía y continuar ejerciendo en el hospital.</p>
            <p>Por favor, asegúrese de completar el pago antes del <strong>${fecha_vencimiento}</strong> para evitar interrupciones en su actividad profesional.</p>
            <a href="https://pago.colegiado.com">Realizar Pago</a>
            <p>Si ya realizó el pago, por favor ignore este mensaje.</p>
            <p>Atentamente,</p>
            <p><strong>Administración del Hospital</strong></p>
        </div>
        <div class="email-footer">
            <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
            <p>&copy; 2024 Administración del Hospital</p>
        </div>
    </div>
</body>
</html>`;
        const info = await transporter.sendMail({
            from: `"Administración del Hospital" <${process.env.MAILTRAP_FROM}>`, 
            to,
            subject: "Recordatorio de Pago del Colegiado",
            html: htmlContent, 
        });

        res.status(200).json({
            message: "Correo enviado exitosamente.",
            info,
        });
    } catch (error) {
        console.error("Error enviando el correo:", error);
        res.status(500).json({ error: "No se pudo enviar el correo." });
    }
});

app.listen(CORREO_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${CORREO_PORT}`);
});
```
- Dado que el sistema maneja información crítica tanto de los pacientes como de la
operación del hospital, es esencial implementar un sistema de backups y
restauraciones para asegurar la continuidad del servicio en caso de fallos.

Backups para: 
- MongoDB (Expedientes)
- SQL Server (Usuarios y Áreas)
- Redis (Bitácora)

```python
@base_mongo.route('/crear_backups', methods=['POST'])
def crear_backup_Mongo():
    status_mongo = "ERROR"
    status_sql = "ERROR"
    status_redis = "ERROR"
    #OBTENER CREDENCIALES POR PRIMERA VEZ
    '''creds = obtener_credenciales()
    with open('token.json', 'w') as token:
        token.write(creds.to_json())'''
    #BACKUP MONGO
    try:
        fecha_actual = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        cliente = get_db_connection_MONGODB() #CONEXION A MONGO
        if cliente is not None:
            try:
                MONGO_DB = os.getenv("MONGO_DB")
                MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
                db = cliente[MONGO_DB]
                expedientes = db[MONGO_COLLECTION]
                documentos = list(expedientes.find({}))#OBTENER TODOS LOS EXPEDIENTES
                archivo_respaldo = f"backup_{MONGO_COLLECTION}_{fecha_actual}.json" #GUARDAR DATA EN ARCHIVO JSON
                with open(archivo_respaldo, 'w', encoding='utf-8') as f:
                    json.dump(documentos, f, default=str, ensure_ascii=False, indent=4)
                    f.close()
            except OperationFailure as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
                return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
            except PyMongoError as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
                return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
            except Exception as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", f"Error inesperado: {str(e)}")
                return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
            finally:
                cliente.close()
    except:
        print("ERROR CONECTANDOSE A MONGO")
    #BACKUP SQL SERVER
    conn = get_db_connection_SQLSERVER()
    if conn is not None:
        cursor = conn.cursor()
        try:
            databasesql = os.getenv("DATABASESQL")
            backup_path_sql = os.getenv("RUTA_TEMPORAL") 
            backup_path_sql_FILE = f"{backup_path_sql}backup_{fecha_actual}.bak"
            print(databasesql)
            print(backup_path_sql_FILE)
            backup_query = f"""
                BACKUP DATABASE {databasesql}
                TO DISK = '{backup_path_sql_FILE}'
                """
            cursor.execute(backup_query)
            error_message = cursor.messages
            if error_message:
                print(f"Mensajes de error: {error_message}")
            conn.commit()
            cursor.close()
            conn.close()
            if not os.path.exists(backup_path_sql_FILE):
                print(f"Error: OCURRIO UN ERROR AL CREAR BACKUP SQL")
            #print(f"Backup de la base de datos {databasesql} realizado con éxito en {backup_path_sql}.")
        except Exception as e:
            print(f"Error al realizar el backup: {e}")
    #SUBIR ARCHIVOS
    creds = cargar_creds()
    if creds is None:
        #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Ocurrio un error con las credenciales")
        return jsonify({"Error": "Ocurrio un error con las credenciales"}), 400
    service = build('drive', 'v3', credentials=creds)
    backup_folder_id = create_folder(service, 'backups')
    mongo_folder_id = create_folder(service, 'mongo', backup_folder_id)
    sql_folder_id = create_folder(service, 'sql', backup_folder_id)

    file_sql_id = ""
    file_mongo_id = ""
    if(mongo_folder_id):
        if not os.path.exists(archivo_respaldo):
            print(f"Error: El archivo {archivo_respaldo} no existe.")
        file_mongo_id = upload_to_google_drive(service, archivo_respaldo, mongo_folder_id)
        os.remove(archivo_respaldo)#borrar el archivo local
        status_mongo = "EXITO"

    if(sql_folder_id):
        if not os.path.exists(backup_path_sql_FILE):
            print(f"Error: El archivo {backup_path_sql_FILE} no existe.")
        else:
            file_sql_id = upload_to_google_drive(service, backup_path_sql_FILE, sql_folder_id)
            status_sql = "EXITO"
    #save_log_param("consulta", "INFO", "crear_backup_Mongo", "Mongo_Controller", "Backups creado con exito") 
    return jsonify({"mongo_status": status_mongo, "file_mongo_id": file_mongo_id, "sql_status": status_sql,"file_sql_id": file_sql_id }), 200
```