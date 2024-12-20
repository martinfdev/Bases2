#Estadísticas de pacientes atendidos, diagnósticos más comunes, etc.
from CONFIG.connection import get_db_connection_SQLSERVER
from SERVICIO_MONGO.app.mongo_routes import obtener_diagnosticos_comunes
from flask import jsonify
#pacientes atendidos

def get_pacientes_atendidos():
    conn = get_db_connection_SQLSERVER()
    cursor = conn.cursor()
    query = """
    SELECT 
        a.nombre_area AS Area,
        COUNT(pe.id_paciente) AS PacientesAtendidos
    FROM PacienteEnfermera pe
    JOIN Paciente p ON pe.id_paciente = p.id_paciente
    JOIN AreaUsuario au ON pe.id_usuario = au.id_usuario
    JOIN Area a ON au.id_area = a.id_area
    GROUP BY a.nombre_area;
    """
    cursor.execute(query)
    resultados = cursor.fetchall()
    conn.close()
    estadisticas = {
        {
            "area": row.Area, 
            "pacientes_atendidos": row.PacientesAtendidos}
        for row in resultados
    }
    return estadisticas


def get_diagnosticos_mas_comunes():
    try:
        diagnos = obtener_diagnosticos_comunes()  # Obtiene los diagnósticos comunes desde MongoDB
        # Asegúrate de que obtenemos solo los datos de la respuesta
        if "diagnosticos" in diagnos:
            return jsonify(diagnos["diagnosticos"]), 200  # Retorna solo los diagnósticos con código 200 OK
        else:
            return jsonify({"message": "No se encontraron diagnósticos comunes."}), 404  # Si no hay diagnósticos, error 404
    except Exception as e:
        return jsonify({"error": f"Error al obtener los diagnósticos: {str(e)}"}), 500  # Error 500 si ocurre una excepción
    

def get_estado_area():
    conn = get_db_connection_SQLSERVER()
    cursor = conn.cursor()
    query = """
    SELECT 
        a.id_area,
        a.nombre_area,
        a.capacidad,
        COUNT(p.id_paciente) AS pacientes_asignados,
        (a.capacidad - COUNT(p.id_paciente)) AS disponibilidad,
        CASE 
            WHEN COUNT(p.id_paciente) = a.capacidad THEN 'Área llena'
            WHEN COUNT(p.id_paciente) > a.capacidad THEN 'Exceso de ocupación'
            ELSE 'Disponible'
        END AS estado_area
    FROM 
        Area a
    LEFT JOIN 
        Paciente p ON a.id_area = p.id_area
    GROUP BY 
        a.id_area, a.nombre_area, a.capacidad
    ORDER BY 
        a.nombre_area;
    """
    cursor.execute(query)
    resultados = cursor.fetchall()
    estado_areas = []
    for row in resultados:
        estado_areas.append({
            "id_area": row.id_area,
            "nombre_area": row.nombre_area,
            "capacidad": row.capacidad,
            "pacientes_asignados": row.pacientes_asignados,
            "disponibilidad": row.disponibilidad,
            "estado_area": row.estado_area
        })
    cursor.close()
    conn.close()
    return jsonify(estado_areas)