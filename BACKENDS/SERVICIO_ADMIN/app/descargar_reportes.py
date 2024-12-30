from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from openpyxl import Workbook
import pandas as pd

def generar_pdf_areas(estado_areas):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Estado de las Áreas")
    y = 730  # Posición inicial para dibujar los textos

    # Verificar si estado_areas está vacío
    if not estado_areas:
        c.drawString(100, y, "No hay datos disponibles.")
        c.save()
        pdf_buffer.seek(0)
        return pdf_buffer

    for area in estado_areas:
        # Comprobación para 'nombre_area'
        nombre_area = area.get('nombre_area', None)
        if not nombre_area:  # Si no existe o está vacío, mostrar "No hay datos"
            nombre_area = "No hay datos"
        
        c.drawString(100, y, f"Área: {nombre_area}")
        y -= 15

        # Comprobación para 'capacidad'
        capacidad = area.get('capacidad', None)
        if not capacidad:  # Si no existe o está vacío, mostrar "No hay datos"
            capacidad = "No hay datos"
        
        c.drawString(100, y, f"Capacidad: {capacidad}")
        y -= 15

        # Comprobación para 'pacientes_asignados'
        pacientes_asignados = area.get('pacientes_asignados', None)
        if not pacientes_asignados:  # Si no existe o está vacío, mostrar "No hay datos"
            pacientes_asignados = "No hay datos"
        
        c.drawString(100, y, f"Pacientes Asignados: {pacientes_asignados}")
        y -= 15

        # Comprobación para 'disponibilidad'
        disponibilidad = area.get('disponibilidad', None)
        if not disponibilidad:  # Si no existe o está vacío, mostrar "No hay datos"
            disponibilidad = "No hay datos"
        
        c.drawString(100, y, f"Disponibilidad: {disponibilidad}")
        y -= 15

        # Comprobación para 'estado_area'
        estado = area.get('estado_area', None)
        if not estado:  # Si no existe o está vacío, mostrar "No hay datos"
            estado = "No hay datos"
        
        c.drawString(100, y, f"Estado: {estado}")
        y -= 20  # Espacio extra después de cada área

        # Si el espacio es insuficiente para agregar más áreas, se añade una nueva página
        if y < 100:
            c.showPage()
            y = 750  # Reiniciar la posición 'y' en la nueva página
    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer



def generar_pdf_pacientes_atendidos(pacientes_atendidos):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Pacientes Atendidos")  # Título actualizado
    
    y = 730  # Posición inicial para dibujar los textos

    if not pacientes_atendidos:
        c.drawString(100, y, "No hay datos disponibles.")
        c.save()
        pdf_buffer.seek(0)
        return pdf_buffer

    for atendidos in pacientes_atendidos:
        # Comprobación para 'area'
        area = atendidos.get('area', None)
        if not area:  # Si no existe o está vacío, mostrar "No hay datos"
            area = "No hay datos"
        
        c.drawString(100, y, f"Área: {area}")
        y -= 15

        # Comprobación para 'pacientes_atendidos'
        pacientes = atendidos.get('pacientes_atendidos', None)
        if not pacientes:  # Si no existe o está vacío, mostrar "No hay pacientes atendidos"
            pacientes = "No hay pacientes atendidos"

        c.drawString(100, y, f"Pacientes Atendidos: {pacientes}")
        y -= 20  # Espacio extra después de cada grupo de datos
        
        # Si el espacio es insuficiente para agregar más datos, se añade una nueva página
        if y < 100:
            c.showPage()
            y = 750  # Reiniciar la posición 'y' en la nueva página

    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer




def generar_pdf_diagnosticos_comunes(diagnosticos_comunes):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Diagnósticos Comunes")  # Título corregido
    
    y = 730  # Posición inicial para dibujar los textos
    
    if not diagnosticos_comunes:
        c.drawString(100, y, "No hay datos disponibles.")
        c.save()
        pdf_buffer.seek(0)
        return pdf_buffer

    for diagnostico in diagnosticos_comunes:
        # Comprobación para 'nombre_area'
        nombre_area = diagnostico.get('nombre_area', None)
        if not nombre_area:  # Si no existe o está vacío, mostrar "No hay datos"
            nombre_area = "No hay datos"
        
        # Comprobación para 'diagnostico'
        diagnostico_valor = diagnostico.get('diagnostico', None)
        if not diagnostico_valor:  # Si no existe o está vacío, mostrar "No hay datos"
            diagnostico_valor = "No hay datos"
        
        # Comprobación para 'frecuencia'
        frecuencia = diagnostico.get('frecuencia', None)
        if not frecuencia:  # Si no existe o está vacío, mostrar "No hay datos"
            frecuencia = "No hay datos"
        
        # Mostrar los datos
        c.drawString(100, y, f"Área: {nombre_area}")
        y -= 15
        c.drawString(100, y, f"Diagnóstico: {diagnostico_valor}")
        y -= 15
        c.drawString(100, y, f"Frecuencia: {frecuencia}")
        y -= 20  # Espacio extra después de cada conjunto de datos
        
        # Si el espacio es insuficiente para agregar más datos, se añade una nueva página
        if y < 100:
            c.showPage()
            y = 750  # Reiniciar la posición 'y' en la nueva página

    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer



def generar_excel_areas(estado_areas):
    # Reemplazar valores vacíos o nulos por "No hay datos"
    for area in estado_areas:
        area['nombre_area'] = area.get('nombre_area', 'No hay datos') or 'No hay datos'
        area['capacidad'] = area.get('capacidad', 'No hay datos') or 'No hay datos'
        area['pacientes_asignados'] = area.get('pacientes_asignados', 'No hay datos') or 'No hay datos'
        area['disponibilidad'] = area.get('disponibilidad', 'No hay datos') or 'No hay datos'
        area['estado_area'] = area.get('estado_area', 'No hay datos') or 'No hay datos'
    
    df = pd.DataFrame(estado_areas)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Estado Áreas')
    excel_buffer.seek(0)
    return excel_buffer


# Función para generar Excel de pacientes atendidos
def generar_excel_pacientes_atendidos(pacientes_atendidos):
    # Reemplazar valores vacíos o nulos por "No hay datos"
    for paciente in pacientes_atendidos:
        paciente['area'] = paciente.get('area', 'No hay datos') or 'No hay datos'
        paciente['pacientes_atendidos'] = paciente.get('pacientes_atendidos', 'No hay datos') or 'No hay datos'
    
    df = pd.DataFrame(pacientes_atendidos)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Pacientes Atendidos')
    excel_buffer.seek(0)
    return excel_buffer


# Función para generar Excel de diagnósticos comunes
def generar_excel_diagnosticos_comunes(diagnosticos_comunes):
    # Reemplazar valores vacíos o nulos por "No hay datos"
    for diagnostico in diagnosticos_comunes:
        diagnostico['nombre_area'] = diagnostico.get('nombre_area', 'No hay datos') or 'No hay datos'
        diagnostico['diagnostico'] = diagnostico.get('diagnostico', 'No hay datos') or 'No hay datos'
        diagnostico['frecuencia'] = diagnostico.get('frecuencia', 'No hay datos') or 'No hay datos'
    
    df = pd.DataFrame(diagnosticos_comunes)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Diagnósticos Comunes')
    excel_buffer.seek(0)
    return excel_buffer