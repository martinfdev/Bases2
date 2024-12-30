from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from openpyxl import Workbook
import pandas as pd

def generar_pdf_areas(estado_areas):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Estado de las Áreas")
    y = 730
    for area in estado_areas:
        c.drawString(100, y, f"Área: {area['nombre_area']}, Capacidad: {area['capacidad']}, "
                              f"Pacientes Asignados: {area['pacientes_asignados']}, "
                              f"Disponibilidad: {area['disponibilidad']}, Estado: {area['estado_area']}")
        y -= 20
        if y < 100:
            c.showPage()
            y = 750
    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer

def generar_pdf_pacientes_atendidos(pacientes_atendidos):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Pacientes Atendidos")  # Título actualizado
    y = 730
    for atendidos in pacientes_atendidos:
        # Mostramos los datos por área y pacientes atendidos
        c.drawString(100, y, f"Área: {atendidos['area']}, "
                              f"Pacientes Atendidos: {atendidos['pacientes_atendidos']}")
        y -= 20
        if y < 100:  # Si el espacio se llena, se crea una nueva página
            c.showPage()
            y = 750
    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer



def generar_pdf_diagnosticos_comunes(diagnosticos_comunes):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, "Reporte de Diagnósticos Comunes")  # Título corregido
    y = 730
    for diagnostico in diagnosticos_comunes:
        # Mostramos el diagnóstico y su frecuencia
        c.drawString(100, y, f"Área: {diagnostico['nombre_area']}, Diagnóstico: {diagnostico['diagnostico']}, "
                              f"Frecuencia: {diagnostico['frecuencia']}")
        y -= 20
        if y < 100:  # Si el espacio se llena, se crea una nueva página
            c.showPage()
            y = 750

    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer



def generar_excel_areas(estado_areas):
    df = pd.DataFrame(estado_areas)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Estado Áreas')
    excel_buffer.seek(0)
    return excel_buffer


def generar_excel_pacientes_atendidos(pacientes_atendidos):
    df = pd.DataFrame(pacientes_atendidos)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Pacientes Atendidos')
    excel_buffer.seek(0)
    return excel_buffer

def generar_excel_diagnosticos_comunes(diagnosticos_comunes):
    df = pd.DataFrame(diagnosticos_comunes)
    excel_buffer = BytesIO()
    with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Reporte Diagnósticos Comunes')
    excel_buffer.seek(0)
    return excel_buffer