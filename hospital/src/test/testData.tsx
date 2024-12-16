export const dataLogin = {
    message: "Login successful",
    token: "eyJhbGciOiJIUzI1NiIsInR5sdfskpXVCJ9.eyJpZF91c3VhcmlvIjoxMSwiaWRfcm9sIjoxLCJub21icmVfdXN1YXJpbyI6Im5vb29vbyJ9.0inzZBQLd5dFF41vdZwsituroIBv7ITOR2a_XAJTBe8"
}

export const dataUser =
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

export const listSpecialty = {
    "especialidades": [
        {
            "id_especialidad": 1,
            "especialidad": "Cardiologia"
        },
        {
            "id_especialidad": 2,
            "especialidad": "Anestesiologia"
        },
        {
            "id_especialidad": 3,
            "especialidad": "Dermatologia"
        },
        {
            "id_especialidad": 4,
            "especialidad": "Endocrinologia"
        },
        {
            "id_especialidad": 5,
            "especialidad": "Gastroenterologia"
        }
    ]
}

export const dashboardAdmin = {
    "message": "Welcome admin, these are the users",
}

export const listUsers =
{
    "message": "Usuario encontrado",
    "user": [
        {
            "apellidos": "Reyes Gonzalez",
            "correo": "eduardoalex2000@hotmail.com",
            "direccion": "Ciudad de Guatemala",
            "dpi": "3013805890101",
            "estado": null,
            "fecha_ingreso": "Fri, 13 Dec 2024 00:00:00 GMT",
            "fecha_vencimiento_colegiado": null,
            "genero": "Masculino",
            "id_rol": 4,
            "id_usuario": 1,
            "nombres": "Eduardo Alexander",
            "telefono": "35958027",
            "id_especialidad": 1
        },
        {
            "apellidos": "Reyes Gonzalez",
            "correo": "eduardoalex2000@hotmail.com",
            "direccion": "Ciudad de Guatemala",
            "dpi": "3013805890102",
            "estado": null,
            "fecha_ingreso": "Fri, 13 Dec 2024 00:00:00 GMT",
            "fecha_vencimiento_colegiado": null,
            "genero": "Masculino",
            "id_rol": 4,
            "id_usuario": 1,
            "nombres": "Eduardo Alexander",
            "telefono": "35958027",
            "id_especialidad": 2
        },
        {
            "apellidos": "Reyes Gonzalez",
            "correo": "eduardoalex2000@hotmail.com",
            "direccion": "Ciudad de Guatemala",
            "dpi": "3013805890113",
            "estado": null,
            "fecha_ingreso": "Fri, 13 Dec 2024 00:00:00 GMT",
            "fecha_vencimiento_colegiado": null,
            "genero": "Masculino",
            "id_rol": 4,
            "id_usuario": 1,
            "nombres": "Eduardo Alexander",
            "telefono": "35958027",
            "id_especialidad": 3
        },
        {
            "apellidos": "Reyes Gonzalez",
            "correo": "eduardoalex2000@hotmail.com",
            "direccion": "Ciudad de Guatemala",
            "dpi": "3013805890114",
            "estado": null,
            "fecha_ingreso": "Fri, 13 Dec 2024 00:00:00 GMT",
            "fecha_vencimiento_colegiado": null,
            "genero": "Masculino",
            "id_rol": 4,
            "id_usuario": 1,
            "nombres": "Eduardo Alexander",
            "telefono": "35958027",
            "id_especialidad": 4
        },
        {
            "apellidos": "LopézMODIFICADO",
            "correo": "maria.lopez@example.com",
            "direccion": "Calle Principal 123",
            "dpi": "9876567890123",
            "fecha_ingreso": "Sat, 11 Nov 2023 00:00:00 GMT",
            "fecha_vencimiento_colegiado": "Tue, 31 Dec 2024 00:00:00 GMT",
            "genero": "Femenino",
            "nombres": "MariaMODIFICADO",
            "id_rol": 2,
            "telefono": "66666666",
            "id_usuario": 2,
            "id_especialidad": 1,
        }
    ]
}

export const adminUsers = [
    {
        "espacio_asignado": "50.00",
        "espacio_ocupado": "0.00",
        "id_usuario": 1,
        "nombre_usuario": "jperez"
    },
    {
        "espacio_asignado": "15.00",
        "espacio_ocupado": "0.00",
        "id_usuario": 9,
        "nombre_usuario": "asdf"
    }
]

export const dataUserInactive = [
    {
        "email": "juan.perez@example.com",
        "fecha_ultimo_login": "Nunca",
        "id_usuario": 1,
        "nombre_usuario": "jperez"
    },
    {
        "email": "aaaa.perez@example.com",
        "fecha_ultimo_login": "2024-07-20 00:00:00",
        "id_usuario": 9,
        "nombre_usuario": "asdf"
    }
]