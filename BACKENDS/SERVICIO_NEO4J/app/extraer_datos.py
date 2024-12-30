from flask import Blueprint, jsonify, request
import csv
from CONFIG.connection import get_db_connection_SQLSERVER

base_neo4j = Blueprint('base_neo4j', __name__)

conn  = get_db_connection_SQLSERVER()

def exportar_areas_a_csv():
    cursor = conn.cursor()
    query = '''
    SELECT 
        a.id_area AS AreaID,
        a.nombre_area AS NombreArea,
        a.capacidad AS Capacidad
    FROM 
        Area a
    '''
    cursor.execute(query)
    # Guardar los resultados de Áreas en un archivo CSV
    with open('areas.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Escribir el encabezado
        writer.writerow(['AreaID', 'NombreArea', 'Capacidad'])
        # Escribir los datos de las áreas
        for row in cursor.fetchall():
            writer.writerow(row)
    
    cursor.close()

def exportar_pacientes_a_csv():
    cursor = conn.cursor()
    query = '''
    SELECT 
        p.id_paciente AS PacienteID,
        p.nombre + ' ' + p.apellido AS NombrePaciente,
        p.id_area AS AreaID
    FROM 
        Paciente p
    '''    
    cursor.execute(query)
    # Guardar los resultados de Pacientes en un archivo CSV
    with open('pacientes.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Escribir el encabezado
        writer.writerow(['PacienteID', 'NombrePaciente', 'AreaID'])
        # Escribir los datos de los pacientes
        for row in cursor.fetchall():
            writer.writerow(row)
    cursor.close()

@base_neo4j.route("/extract_expediente", methods=["GET"])  # Cambio a GET
def exportar_csv():
    try:
        exportar_areas_a_csv()
        exportar_pacientes_a_csv()
        return jsonify({"message": "Archivo creado"}), 200  # Retorna el mensaje en formato JSON
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500  # Si hay un error, lo reporta en JSON
