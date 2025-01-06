import { useState } from 'react'
import PropTypes from 'prop-types'

const PatientVisitForm = ({ onSubmit, patient }) => {
  const [formData, setFormData] = useState({
    _id: patient.dpi || '',
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
            Posicion: '',
            BrazoIzquierdo: '',
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
          "1": '',
          "2": '',
        },
      },
      EvolucionDeProblemas: {
        Fecha: '',
        Hora: '',
        NumeroYNombreDeCadaProblema: {
          "1": '',
          "2": '',
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

  const [currentPage, setCurrentPage] = useState(0)

  const mapFieldsWithTitles = (prefix, obj, parentLabel = '') => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const currentLabel = `${parentLabel}${parentLabel ? ' - ' : ''}${key}`
      if (typeof value === 'object' && value !== null) {
        return [
          { type: 'title', label: currentLabel },
          ...mapFieldsWithTitles(`${prefix}.${key}`, value, currentLabel),
        ]
      }
      return {
        label: key,
        name: `${prefix}.${key}`,
        type: 'text',
        value: value ?? '',
      }
    })
  }

  const sections = [
    {
      title: 'Información General',
      fields: [
        { label: 'ID', name: '_id', type: 'text', value: formData._id, required: true },
        { label: 'Fecha de la Visita', name: 'contenido.FechaDeLaVisita', type: 'date', value: formData.contenido.FechaDeLaVisita, required: true },
        { label: 'Motivo de la Visita', name: 'contenido.MotivoDeLaVisita', type: 'textarea', value: formData.contenido.MotivoDeLaVisita, required: true },
        { label: 'Historia de la Visita Actual', name: 'contenido.HistoriaDeLaVisitaActual', type: 'textarea', value: formData.contenido.HistoriaDeLaVisitaActual, required: true },
        { label: 'Tipo de Visita', name: 'contenido.TipoDeVisita', type: 'text', value: formData.contenido.TipoDeVisita, required: true },
      ],
    },
    {
      title: 'Revisión por Órganos y Sistemas',
      fields: Object.entries(formData.contenido.RevisionPorOrganosAparatosYSistemas).map(([key, value]) => ({
        label: key,
        name: `contenido.RevisionPorOrganosAparatosYSistemas.${key}`,
        type: 'text',
        value,
      })),
    },
    {
      title: 'Examen Físico',
      fields: mapFieldsWithTitles('contenido.ExamenFisico', formData.contenido.ExamenFisico),
    },
    {
      title: 'Lista Inicial de Problemas',
      fields: Object.entries(formData.contenido.ListaInicialDeProblemas).map(([key, value]) => ({
        label: `Problema ${key}`,
        name: `contenido.ListaInicialDeProblemas.${key}`,
        type: 'text',
        value,
      })),
    },
    {
      title: 'Desarrollo de Problemas',
      fields: mapFieldsWithTitles('contenido.DesarrolloDeProblemas', formData.contenido.DesarrolloDeProblemas),
    },
    {
      title: 'Evolución de Problemas',
      fields: mapFieldsWithTitles('contenido.EvolucionDeProblemas', formData.contenido.EvolucionDeProblemas),
    },
    {
      title: 'Diagnóstico y Tratamiento',
      fields: [
        { label: 'Diagnóstico', name: 'contenido.Diagnostico', type: 'textarea', value: formData.contenido.Diagnostico },
        { label: 'Procedimientos Realizados', name: 'contenido.ProcedimientosRealizados', type: 'textarea', value: formData.contenido.ProcedimientosRealizados },
        { label: 'Tratamiento o Prescripción', name: 'contenido.TratamientoOPrescripcion', type: 'textarea', value: formData.contenido.TratamientoOPrescripcion },
        { label: 'Resultado de la Visita', name: 'contenido.ResultadoDeLaVisita', type: 'textarea', value: formData.contenido.ResultadoDeLaVisita },
        { label: 'Médico Responsable', name: 'contenido.MedicoResponsable', type: 'text', value: formData.contenido.MedicoResponsable },
        { label: 'Especialidad Médica', name: 'contenido.EspecialidadMedica', type: 'text', value: formData.contenido.EspecialidadMedica },
        { label: 'Seguimiento Recomendado', name: 'contenido.SeguimientoRecomendado', type: 'text', value: formData.contenido.SeguimientoRecomendado },
        { label: 'Observaciones Adicionales', name: 'contenido.ObservacionesAdicionales', type: 'textarea', value: formData.contenido.ObservacionesAdicionales },
      ],
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    setFormData((prev) => {
      let data = { ...prev }
      let ref = data
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]]
      }
      ref[keys[keys.length - 1]] = value
      return data
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{sections[currentPage].title}</h2>
      {sections[currentPage].fields.map((field, index) => (
        <div key={index}>
          {field.type === 'title' ? (
            <h3 className="text-lg font-semibold mt-4 mb-2">{field.label}</h3>
          ) : (
            <>
              <label className="block text-gray-700">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                />
              )}
            </>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        {currentPage < sections.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, sections.length - 1))}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Aceptar
          </button>
        )}
      </div>
    </form>
  )
}

PatientVisitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
}

export default PatientVisitForm
