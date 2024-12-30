from flask import Blueprint, Flask, request, jsonify
import csv
from io import StringIO
from .neo4j_connection import get_neo4j_session

cargar_datos = Blueprint('cargar_datos', __name__)

def crear_relaciones_pacientes_areas(session, area_file_content, paciente_file_content):
    # Leer áreas desde el archivo CSV en memoria
    area_file_content.seek(0)  # Asegúrate de que el puntero esté al principio
    area_reader = csv.DictReader(area_file_content)
    
    # Limpiar los nombres de las columnas (quitar espacios)
    fieldnames_area = [field.strip() for field in area_reader.fieldnames]
    area_reader = csv.DictReader(area_file_content, fieldnames=fieldnames_area)
    
    # Crear nodos de áreas
    for row in area_reader:
        query = """
        MERGE (a:Area {id_area: $id_area})
        SET a.nombre = $nombre, a.capacidad = $capacidad
        """
        session.run(query, parameters={
            'id_area': row['AreaID'],  
            'nombre': row['NombreArea'],
            'capacidad': row['Capacidad']  
        })

    # Leer pacientes desde el archivo CSV en memoria
    paciente_file_content.seek(0)  # Asegúrate de que el puntero esté al principio
    paciente_reader = csv.DictReader(paciente_file_content)
    
    # Limpiar los nombres de las columnas (quitar espacios)
    fieldnames_paciente = [field.strip() for field in paciente_reader.fieldnames]
    paciente_reader = csv.DictReader(paciente_file_content, fieldnames=fieldnames_paciente)
    
    # Crear nodos de pacientes y relaciones con áreas
    for row in paciente_reader:
        query = """
        MERGE (p:Paciente {id_paciente: $id_paciente})
        SET p.nombre = $nombre
        WITH p
        MATCH (a:Area {id_area: $id_area})
        MERGE (p)-[:ASIGNADO_A]->(a)
        """
        session.run(query, parameters={
            'id_paciente': row['PacienteID'],
            'nombre': row['NombrePaciente'],
            'id_area': row['AreaID']  
        })

def cargar_datos_neo4j(area_file_content, paciente_file_content):
    # Obtener la sesión de Neo4j
    session = get_neo4j_session()
    try:
        crear_relaciones_pacientes_areas(session, area_file_content, paciente_file_content)
    except Exception as e:
        raise Exception(f"Error al cargar los datos en Neo4j: {str(e)}")
    finally:
        session.close()

# Ruta de la API
@cargar_datos.route('/cargar_datos_neo4j', methods=['POST'])
def load_Data():
    # Verificar si los archivos fueron enviados
    if 'area_csv' not in request.files or 'paciente_csv' not in request.files:
        return jsonify({'error': 'Archivos CSV requeridos'}), 400
    area_file = request.files['area_csv']
    paciente_file = request.files['paciente_csv']
    try:
        area_file_content = StringIO(area_file.read().decode('utf-8'))
        paciente_file_content = StringIO(paciente_file.read().decode('utf-8'))
        cargar_datos_neo4j(area_file_content, paciente_file_content)
        return jsonify({'message': 'Datos cargados exitosamente en Neo4j'}), 200

    except Exception as e:
        return jsonify({'error': f'Error al cargar los datos en Neo4j: {str(e)}'}), 500
