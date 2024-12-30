import { useState } from 'react'

export default function VisitForm() {
  const [formData, setFormData] = useState({
    _id: '',
    contenido: {
      FechaDeLaVisita: '',
      MotivoDeLaVisita: '',
      HistoriaDeLaVisitaActual: '',
      TipoDeVisita: '',
      RevisionPorOrganosAparatosYSistemas: {
        SintomasGenerales: '',
        Piel: '',
        Faneras: '',
        Cabeza: '',
        Ojos: '',
        Oidos: '',
        Nariz: '',
        Boca: '',
        Garganta: '',
        Cuello: '',
        Respiratorio: '',
        Cardiovascular: '',
        Digestivo: '',
        Reproductor: '',
        Genitourinario: '',
        Endocrino: '',
        MusculoEsqueletico: '',
        Nervioso: '',
        Linfatico: '',
        Hematopoyetico: '',
        PsiquiatricoAfecto: '',
      },
      ExamenFisico: {
        SignosVitales: {
          TemperaturaEnC: '',
          RegionAnatomica: '',
          FrecuenciaRespiratoria: '',
          FrecuenciaCardiaca: '',
          FrecuenciaDePulso: '',
          Perifericos: {
            Carotideo: '',
            Radial: '',
            Femoral: '',
          },
          PresionArterial: {
            BrazoDerecho: '',
            PosicionBrazoDerecho: '',
            BrazoIzquierdo: '',
            PosicionBrazoIzquierdo: '',
          },
          Antropometria: {
            Peso: {
              Libras: '',
              KG: '',
            },
            Talla: '',
            CircunferenciaCefalica: '',
            CircunferenciaAbdominal: '',
            IndiceMasaCorporal: '',
          },
        },
        InspeccionGeneral: '',
        Piel: '',
        Faneras: '',
        Cabeza: '',
        Ojos: {
          AgudezaVisual: {
            ConLentes: {
              OjoDerecho: '',
              OjoIzquierdo: '',
              AmbosOjos: '',
            },
            SinLentes: {
              OjoDerecho: '',
              OjoIzquierdo: '',
              AmbosOjos: '',
            },
          },
        },
        Oidos: '',
        Nariz: '',
        Boca: '',
        Orofaringe: '',
        Cuello: '',
        Linfaticos: '',
        Torax: {
          Anterior: '',
          Lateral: '',
          Posterior: '',
        },
        Mamas: '',
        Abdomen: '',
        GenitalesExternos: '',
        ExtremidadesSuperiores: '',
        ExtremidadesInferiores: '',
        RegionLumbosacra: '',
        RegionPelvica: '',
        TactoRectal: '',
        ExamenGinecologico: '',
        ExamenNeurologico: '',
        ExamenMental: '',
      },
      ListaInicialDeProblemas: {
        Numero1: '',
        Numero2: '',
        Numero3: '',
        Numero4: '',
      },
      DesarrolloDeProblemas: {
        Fecha: '',
        Hora: '',
        NumeroYNombreDeCadaProblema: {
          '1': '',
          '2': '',
        },
      },
      EvolucionDeProblemas: {
        Fecha: '',
        Hora: '',
        NumeroYNombreDeCadaProblema: {
          '1': '',
          '2': '',
        },
      },
      Diagnostico: '',
      ProcedimientosRealizados: '',
      TratamientoOPrescripcion: '',
      ResultadoDeLaVisita: '',
      MedicoResponsable: '',
      EspecialidadMedica: '',
      SeguimientoRecomendado: '',
      ObservacionesAdicionales: '',
    },
  })

  // Manejadores de cambio para las propiedades principales
  const handleChange = (e, path = []) => {
    // Este manejador recibe el evento y un arreglo 'path' que indica la posición
    // del valor en el objeto formData.
    const { value } = e.target

    setFormData((prevData) => {
      // Clonamos el objeto
      const newData = { ...prevData }

      // Navegamos hasta la posición requerida
      let pointer = newData
      for (let i = 0; i < path.length - 1; i++) {
        pointer = pointer[path[i]];
      }

      // Asignamos el nuevo valor
      pointer[path[path.length - 1]] = value

      return newData
    })
  }

  // Ejemplo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
    // Aquí podrías llamar a una API o manejar el objeto formData como desees.
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-4xl mx-auto space-y-8'>
      {/* ID */}
      <div className='space-y-2'>
        <label htmlFor='_id' className='block font-semibold'>
          ID del Registro
        </label>
        <input
          type='text'
          id='_id'
          value={formData._id}
          onChange={(e) => handleChange(e, ['_id'])}
          className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
          placeholder='1234567890101'
        />
      </div>

      {/* CONTENIDO */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Contenido de la Visita</h2>

        {/* FechaDeLaVisita */}
        <div>
          <label className='block font-semibold mb-1'>Fecha de la Visita</label>
          <input
            type='date'
            value={formData.contenido.FechaDeLaVisita}
            onChange={(e) => handleChange(e, ['contenido', 'FechaDeLaVisita'])}
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        {/* MotivoDeLaVisita */}
        <div>
          <label className='block font-semibold mb-1'>Motivo de la Visita</label>
          <input
            type='text'
            value={formData.contenido.MotivoDeLaVisita}
            onChange={(e) => handleChange(e, ['contenido', 'MotivoDeLaVisita'])}
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Dolor abdominal...'
          />
        </div>

        {/* HistoriaDeLaVisitaActual */}
        <div>
          <label className='block font-semibold mb-1'>
            Historia de la Visita Actual
          </label>
          <textarea
            value={formData.contenido.HistoriaDeLaVisitaActual}
            onChange={(e) =>
              handleChange(e, ['contenido', 'HistoriaDeLaVisitaActual'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='3'
            placeholder='Describa la historia...'
          />
        </div>

        {/* TipoDeVisita */}
        <div>
          <label className='block font-semibold mb-1'>Tipo de Visita</label>
          <input
            type='text'
            value={formData.contenido.TipoDeVisita}
            onChange={(e) => handleChange(e, ['contenido', 'TipoDeVisita'])}
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Consulta externa...'
          />
        </div>
      </div>

      {/* REVISION POR ORGANOS */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>
          Revisión por Órganos, Aparatos y Sistemas
        </h2>

        {/* SintomasGenerales */}
        <div>
          <label className='block font-semibold mb-1'>Síntomas Generales</label>
          <input
            type='text'
            value={formData.contenido.RevisionPorOrganosAparatosYSistemas.SintomasGenerales}
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'RevisionPorOrganosAparatosYSistemas',
                'SintomasGenerales',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='DolorAbdominal...'
          />
        </div>

        {/* Piel */}
        <div>
          <label className='block font-semibold mb-1'>Piel</label>
          <input
            type='text'
            value={formData.contenido.RevisionPorOrganosAparatosYSistemas.Piel}
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'RevisionPorOrganosAparatosYSistemas',
                'Piel',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Sin alteraciones...'
          />
        </div>

        {/* ... Continúa con los demás campos como Faneras, Cabeza, Ojos, etc. */}
        {/* Ejemplo para Ojos */}
        <div>
          <label className='block font-semibold mb-1'>Ojos</label>
          <input
            type='text'
            value={formData.contenido.RevisionPorOrganosAparatosYSistemas.Ojos}
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'RevisionPorOrganosAparatosYSistemas',
                'Ojos',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='No presenta alteraciones...'
          />
        </div>
        {/* Agrega los demás campos según sea necesario... */}
      </div>

      {/* EXAMEN FISICO */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Examen Físico</h2>

        {/* Signos Vitales */}
        <div className='space-y-4'>
          <h3 className='font-semibold'>Signos Vitales</h3>

          {/* TemperaturaEnC */}
          <div>
            <label className='block font-semibold mb-1'>Temperatura (°C)</label>
            <input
              type='text'
              value={formData.contenido.ExamenFisico.SignosVitales.TemperaturaEnC}
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'TemperaturaEnC',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='36.8'
            />
          </div>

          {/* Región Anatómica */}
          <div>
            <label className='block font-semibold mb-1'>Región Anatómica</label>
            <input
              type='text'
              value={formData.contenido.ExamenFisico.SignosVitales.RegionAnatomica}
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'RegionAnatomica',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Abdomen...'
            />
          </div>

          {/* ... Agrega los demás campos de SignosVitales (FrecuenciaRespiratoria, etc.) ... */}

          {/* Periféricos */}
          <div>
            <label className='block font-semibold mb-1'>Pulso Carotídeo</label>
            <input
              type='text'
              value={
                formData.contenido.ExamenFisico.SignosVitales.Perifericos.Carotideo
              }
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'Perifericos',
                  'Carotideo',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Normal...'
            />
          </div>

          {/* Presión Arterial */}
          <div>
            <label className='block font-semibold mb-1'>
              Presión Arterial (Brazo Derecho)
            </label>
            <input
              type='text'
              value={
                formData.contenido.ExamenFisico.SignosVitales.PresionArterial
                  .BrazoDerecho
              }
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'PresionArterial',
                  'BrazoDerecho',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='120/80 mm/Hg'
            />
          </div>

          {/* ... Continúa con las otras propiedades de Presión Arterial, etc. ... */}

          {/* Antropometría */}
          <div className='space-y-2'>
            <h4 className='font-semibold'>Antropometría</h4>

            <label className='block'>Peso en Libras</label>
            <input
              type='text'
              value={
                formData.contenido.ExamenFisico.SignosVitales.Antropometria.Peso
                  .Libras
              }
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'Antropometria',
                  'Peso',
                  'Libras',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='154'
            />

            <label className='block'>Peso en KG</label>
            <input
              type='text'
              value={
                formData.contenido.ExamenFisico.SignosVitales.Antropometria.Peso.KG
              }
              onChange={(e) =>
                handleChange(e, [
                  'contenido',
                  'ExamenFisico',
                  'SignosVitales',
                  'Antropometria',
                  'Peso',
                  'KG',
                ])
              }
              className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
              placeholder='70'
            />

            {/* ... Continúa con Talla, CircunferenciaCefalica, etc. ... */}
          </div>
        </div>

        {/* Inspección General */}
        <div>
          <label className='block font-semibold mb-1'>Inspección General</label>
          <textarea
            value={formData.contenido.ExamenFisico.InspeccionGeneral}
            onChange={(e) =>
              handleChange(e, ['contenido', 'ExamenFisico', 'InspeccionGeneral'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Paciente en buen estado general...'
          />
        </div>

        {/* ... Continúa con Piel, Cabeza, Ojos (AgudezaVisual), etc. ... */}

        {/* Ejemplo de sección de Ojos con Agudeza Visual */}
        <div className='space-y-2'>
          <h3 className='font-semibold'>Ojos</h3>
          <label className='block'>Con Lentes - Ojo Derecho</label>
          <input
            type='text'
            value={
              formData.contenido.ExamenFisico.Ojos.AgudezaVisual.ConLentes.OjoDerecho
            }
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'ExamenFisico',
                'Ojos',
                'AgudezaVisual',
                'ConLentes',
                'OjoDerecho',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='20/20'
          />

          <label className='block'>Con Lentes - Ojo Izquierdo</label>
          <input
            type='text'
            value={
              formData.contenido.ExamenFisico.Ojos.AgudezaVisual.ConLentes.OjoIzquierdo
            }
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'ExamenFisico',
                'Ojos',
                'AgudezaVisual',
                'ConLentes',
                'OjoIzquierdo',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='20/20'
          />

          {/* ... Continúa con SinLentes ... */}
        </div>

        {/* Continúa con los demás campos de Examen Físico como Oidos, Nariz, Boca, etc. */}
      </div>

      {/* LISTA INICIAL DE PROBLEMAS */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Lista Inicial de Problemas</h2>

        <div>
          <label className='block font-semibold mb-1'>Problema #1</label>
          <input
            type='text'
            value={formData.contenido.ListaInicialDeProblemas.Numero1}
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'ListaInicialDeProblemas',
                'Numero1',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Dolor abdominal agudo...'
          />
        </div>

        {/* Continúa con Numero2, Numero3, Numero4... */}
      </div>

      {/* DESARROLLO DE PROBLEMAS */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Desarrollo de Problemas</h2>
        <div>
          <label className='block font-semibold mb-1'>Fecha</label>
          <input
            type='date'
            value={formData.contenido.DesarrolloDeProblemas.Fecha}
            onChange={(e) =>
              handleChange(e, ['contenido', 'DesarrolloDeProblemas', 'Fecha'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>Hora</label>
          <input
            type='text'
            value={formData.contenido.DesarrolloDeProblemas.Hora}
            onChange={(e) =>
              handleChange(e, ['contenido', 'DesarrolloDeProblemas', 'Hora'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='10:00 AM'
          />
        </div>

        {/* Número y Nombre de cada Problema */}
        <div>
          <label className='block font-semibold mb-1'>
            Problema 1 (Desarrollo)
          </label>
          <input
            type='text'
            value={
              formData.contenido.DesarrolloDeProblemas.NumeroYNombreDeCadaProblema[
                '1'
              ]
            }
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'DesarrolloDeProblemas',
                'NumeroYNombreDeCadaProblema',
                '1',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Dolor abdominal agudo...'
          />
        </div>

        {/* Continua con el Problema 2... */}
      </div>

      {/* EVOLUCIÓN DE PROBLEMAS */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Evolución de Problemas</h2>
        <div>
          <label className='block font-semibold mb-1'>Fecha</label>
          <input
            type='date'
            value={formData.contenido.EvolucionDeProblemas.Fecha}
            onChange={(e) =>
              handleChange(e, ['contenido', 'EvolucionDeProblemas', 'Fecha'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>Hora</label>
          <input
            type='text'
            value={formData.contenido.EvolucionDeProblemas.Hora}
            onChange={(e) =>
              handleChange(e, ['contenido', 'EvolucionDeProblemas', 'Hora'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='10:00 AM'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Problema 1 (Evolución)
          </label>
          <input
            type='text'
            value={
              formData.contenido.EvolucionDeProblemas.NumeroYNombreDeCadaProblema[
                '1'
              ]
            }
            onChange={(e) =>
              handleChange(e, [
                'contenido',
                'EvolucionDeProblemas',
                'NumeroYNombreDeCadaProblema',
                '1',
              ])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Dolor abdominal controlado...'
          />
        </div>
      </div>

      {/* DIAGNÓSTICO Y OTROS CAMPOS FINALES */}
      <div className='border border-gray-300 rounded p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Conclusiones y Prescripción</h2>

        <div>
          <label className='block font-semibold mb-1'>Diagnóstico</label>
          <textarea
            value={formData.contenido.Diagnostico}
            onChange={(e) =>
              handleChange(e, ['contenido', 'Diagnostico'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Dolor abdominal agudo, probable distension muscular...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Procedimientos Realizados
          </label>
          <textarea
            value={formData.contenido.ProcedimientosRealizados}
            onChange={(e) =>
              handleChange(e, ['contenido', 'ProcedimientosRealizados'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Radiografía de abdomen, examen físico...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Tratamiento o Prescripción
          </label>
          <textarea
            value={formData.contenido.TratamientoOPrescripcion}
            onChange={(e) =>
              handleChange(e, ['contenido', 'TratamientoOPrescripcion'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Ibuprofeno 400mg cada 8 horas...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Resultado de la Visita
          </label>
          <textarea
            value={formData.contenido.ResultadoDeLaVisita}
            onChange={(e) =>
              handleChange(e, ['contenido', 'ResultadoDeLaVisita'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Dolor controlado con medicación...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Médico Responsable
          </label>
          <input
            type='text'
            value={formData.contenido.MedicoResponsable}
            onChange={(e) =>
              handleChange(e, ['contenido', 'MedicoResponsable'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Dr. Laura Gomez...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Especialidad Médica
          </label>
          <input
            type='text'
            value={formData.contenido.EspecialidadMedica}
            onChange={(e) =>
              handleChange(e, ['contenido', 'EspecialidadMedica'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Medicina General...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Seguimiento Recomendado
          </label>
          <textarea
            value={formData.contenido.SeguimientoRecomendado}
            onChange={(e) =>
              handleChange(e, ['contenido', 'SeguimientoRecomendado'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Consulta de seguimiento en 1 semana...'
          />
        </div>

        <div>
          <label className='block font-semibold mb-1'>
            Observaciones Adicionales
          </label>
          <textarea
            value={formData.contenido.ObservacionesAdicionales}
            onChange={(e) =>
              handleChange(e, ['contenido', 'ObservacionesAdicionales'])
            }
            className='mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
            rows='2'
            placeholder='Evitar actividades físicas intensas...'
          />
        </div>
      </div>

      {/* BOTÓN DE SUBMIT */}
      <div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
