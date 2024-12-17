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

<h1> Microservicios principales </h1>

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

<h2> Comunicación entre Microservicios </h2>

- Un API Gateway se utilizará como punto único de entrada para todas las solicitudes al sistema. El API Gateway manejará la distribución de solicitudes a los microservicios correspondientes, proporcionando un punto centralizado de seguridad, control y logging.

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

- .env: Configuran las variables de entorno
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

![Imagen ER](img_manual/Captura%20de%20pantalla%202024-12-17%20154026.png)
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