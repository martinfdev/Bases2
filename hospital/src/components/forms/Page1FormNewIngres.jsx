const Page1FormNewIngres = ({ formData, setFormData }) => (
    <div>
      <h2 className="text-lg font-bold mb-4">Información Básica</h2>
      <div className="mb-4">
        <label className="block mb-1">Fecha de la Visita</label>
        <input
          type="date"
          value={formData.FechaDeLaVisita}
          onChange={(e) => setFormData({ ...formData, FechaDeLaVisita: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Motivo de la Visita</label>
        <input
          type="text"
          value={formData.MotivoDeLaVisita}
          onChange={(e) => setFormData({ ...formData, MotivoDeLaVisita: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Historia de la Visita Actual</label>
        <textarea
          value={formData.HistoriaDeLaVisitaActual}
          onChange={(e) => setFormData({ ...formData, HistoriaDeLaVisitaActual: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />
      </div>
    </div>
  )

export default Page1FormNewIngres