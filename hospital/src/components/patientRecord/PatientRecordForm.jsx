import { useState } from 'react'
import Input from '../common/Input'
import ContactInput from './ContactInput '
import TextArea from '../common/TextArea'
import { createRecordPatient } from '../../services/mongoServices'

const PatientRecordForm = () => {
    const [formData, setFormData] = useState({
        _id: '',
        datosPaciente: {
            fechaNacimiento: '',
            edad: '',
            estadoCivil: '',
            ocupacion: '',
            profesion: '',
            religion: '',
            grupoSanguineo: '',
            tipoSangre: '',
            grupoEtnico: '',
            alfabeto: '',
            escolaridad: '',
            procedencia: '',
            sexo: '', // campo para el sexo
        },
        contactoEmergencia: [
            { nombre: '', relacion: '', telefono: '' },
            { nombre: '', relacion: '', telefono: '' },
        ],
        antecedentes: {
            personalesPatologicos: {
                medicos: '',
                quirurgicos: '',
                traumaticos: '',
                alergicos: '',
                toxicomanias: '',
                psychiatricos: '',
                transfusiones: '',
                ginecologicos: '',
                obstetricos: '',
            },
            familiaresPatologicos: '',
            personalesNoPatologicos: {
                prenatal: '',
                natal: '',
                neonatalPostnatal: '',
                crecimiento: '',
                desarrollo: '',
                inmunizaciones: '',
                alimentacion: '',
                habitos: '',
                ginecoObstetricos: {
                    menarquia: '',
                    ciclosMenstruales: '',
                    ultimaMenstruacion: '',
                    anticonceptivos: '',
                    gestas: '',
                    partos: '',
                    cesareas: '',
                    abortos: '',
                    hijosVivos: '',
                },
            },
            socioPersonales: '',
        },
        historialIngresos: [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const keys = name.split('.')
        setFormData((prev) => {
            let updated = { ...prev }
            let current = updated
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {}
                current = current[keys[i]]
            }
            current[keys[keys.length - 1]] = value
            return updated
        })
    }

    const handleContactChange = (index, e) => {
        const { name, value } = e.target
        setFormData((prev) => {
            const updatedContacts = [...prev.contactoEmergencia]
            updatedContacts[index][name] = value
            return { ...prev, contactoEmergencia: updatedContacts }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createRecordPatient(formData)
            alert('Expediente creado exitosamente')
            handleReset()
        } catch (error) {
            console.error('Error al crear expediente:', error)
        }
    }

    const handleReset = () => {
        setFormData({
            _id: '',
            datosPaciente: {
                fechaNacimiento: '',
                edad: '',
                estadoCivil: '',
                ocupacion: '',
                profesion: '',
                religion: '',
                grupoSanguineo: '',
                tipoSangre: '',
                grupoEtnico: '',
                alfabeto: '',
                escolaridad: '',
                procedencia: '',
                sexo: '',
            },
            contactoEmergencia: [
                { nombre: '', relacion: '', telefono: '' },
                { nombre: '', relacion: '', telefono: '' },
            ],
            antecedentes: {
                personalesPatologicos: {
                    medicos: '',
                    quirurgicos: '',
                    traumaticos: '',
                    alergicos: '',
                    toxicomanias: '',
                    psychiatricos: '',
                    transfusiones: '',
                    ginecologicos: '',
                    obstetricos: '',
                },
                familiaresPatologicos: '',
                personalesNoPatologicos: {
                    prenatal: '',
                    natal: '',
                    neonatalPostnatal: '',
                    crecimiento: '',
                    desarrollo: '',
                    inmunizaciones: '',
                    alimentacion: '',
                    habitos: '',
                    ginecoObstetricos: {
                        menarquia: '',
                        ciclosMenstruales: '',
                        ultimaMenstruacion: '',
                        anticonceptivos: '',
                        gestas: '',
                        partos: '',
                        cesareas: '',
                        abortos: '',
                        hijosVivos: '',
                    },
                },
                socioPersonales: '',
            },
            historialIngresos: [],
        })
    }
    
    const isMasculino = formData.datosPaciente.sexo === 'Masculino';

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">Expediente de Nuevo Paciente</h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* DPI */}
                <section>
                    <Input
                        label="DPI"
                        name="_id"
                        type="number"
                        value={formData._id}
                        onChange={handleChange}
                    />
                </section>

                {/* Datos del Paciente */}
                <section>
                    <h3 className="text-2xl font-medium mb-4">Datos del Paciente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Fecha de Nacimiento"
                            name="datosPaciente.fechaNacimiento"
                            type="date"
                            value={formData.datosPaciente.fechaNacimiento}
                            onChange={handleChange}
                        />
                        <Input
                            label="Edad"
                            name="datosPaciente.edad"
                            type="number"
                            value={formData.datosPaciente.edad}
                            onChange={handleChange}
                        />
                        <Input
                            label="Estado Civil"
                            name="datosPaciente.estadoCivil"
                            type="text"
                            value={formData.datosPaciente.estadoCivil}
                            onChange={handleChange}
                        />
                        <Input
                            label="Ocupación u Oficio"
                            name="datosPaciente.ocupacion"
                            type="text"
                            value={formData.datosPaciente.ocupacion}
                            onChange={handleChange}
                        />
                        <Input
                            label="Profesión"
                            name="datosPaciente.profesion"
                            type="text"
                            value={formData.datosPaciente.profesion}
                            onChange={handleChange}
                        />
                        <Input
                            label="Religión"
                            name="datosPaciente.religion"
                            type="text"
                            value={formData.datosPaciente.religion}
                            onChange={handleChange}
                        />
                        <Input
                            label="Grupo Sanguíneo"
                            name="datosPaciente.grupoSanguineo"
                            type="text"
                            value={formData.datosPaciente.grupoSanguineo}
                            onChange={handleChange}
                        />
                        <Input
                            label="Tipo de Sangre"
                            name="datosPaciente.tipoSangre"
                            type="text"
                            value={formData.datosPaciente.tipoSangre}
                            onChange={handleChange}
                        />
                        <Input
                            label="Grupo Étnico"
                            name="datosPaciente.grupoEtnico"
                            type="text"
                            value={formData.datosPaciente.grupoEtnico}
                            onChange={handleChange}
                        />
                        <Input
                            label="Alfabeto"
                            name="datosPaciente.alfabeto"
                            type="text"
                            value={formData.datosPaciente.alfabeto}
                            onChange={handleChange}
                        />
                        <Input
                            label="Escolaridad"
                            name="datosPaciente.escolaridad"
                            type="text"
                            value={formData.datosPaciente.escolaridad}
                            onChange={handleChange}
                        />
                        <Input
                            label="Procedencia"
                            name="datosPaciente.procedencia"
                            type="text"
                            value={formData.datosPaciente.procedencia}
                            onChange={handleChange}
                        />

                        {/* Campo Sexo como un select */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Sexo
                            </label>
                            <select
                                name="datosPaciente.sexo"
                                value={formData.datosPaciente.sexo}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Seleccione...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Contacto de Emergencia */}
                <section>
                    <h3 className="text-2xl font-medium mb-4">Contacto de Emergencia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.contactoEmergencia.map((contact, index) => (
                            <ContactInput
                                key={index}
                                index={index + 1}
                                contact={contact}
                                onChange={(e) => handleContactChange(index, e)}
                            />
                        ))}
                    </div>
                </section>

                {/* Antecedentes */}
                <section>
                    <h3 className="text-2xl font-medium mb-4">Antecedentes</h3>

                    {/* Personales Patológicos */}
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-2">Personales Patológicos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextArea
                                label="Médicos"
                                name="antecedentes.personalesPatologicos.medicos"
                                value={formData.antecedentes.personalesPatologicos.medicos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Quirúrgicos"
                                name="antecedentes.personalesPatologicos.quirurgicos"
                                value={formData.antecedentes.personalesPatologicos.quirurgicos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Traumáticos"
                                name="antecedentes.personalesPatologicos.traumaticos"
                                value={formData.antecedentes.personalesPatologicos.traumaticos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Alérgicos"
                                name="antecedentes.personalesPatologicos.alergicos"
                                value={formData.antecedentes.personalesPatologicos.alergicos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Toxicomanías"
                                name="antecedentes.personalesPatologicos.toxicomanias"
                                value={formData.antecedentes.personalesPatologicos.toxicomanias}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Psiquiátricos"
                                name="antecedentes.personalesPatologicos.psychiatricos"
                                value={formData.antecedentes.personalesPatologicos.psychiatricos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Transfusiones"
                                name="antecedentes.personalesPatologicos.transfusiones"
                                value={formData.antecedentes.personalesPatologicos.transfusiones}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Ginecológicos"
                                name="antecedentes.personalesPatologicos.ginecologicos"
                                value={formData.antecedentes.personalesPatologicos.ginecologicos}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Obstétricos"
                                name="antecedentes.personalesPatologicos.obstetricos"
                                value={formData.antecedentes.personalesPatologicos.obstetricos}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Familiares Patológicos */}
                    <div className="mb-6">
                        <TextArea
                            label="Familiares Patológicos"
                            name="antecedentes.familiaresPatologicos"
                            value={formData.antecedentes.familiaresPatologicos}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Personales No Patológicos */}
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-2">Personales No Patológicos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextArea
                                label="Prenatal"
                                name="antecedentes.personalesNoPatologicos.prenatal"
                                value={formData.antecedentes.personalesNoPatologicos.prenatal}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Natal"
                                name="antecedentes.personalesNoPatologicos.natal"
                                value={formData.antecedentes.personalesNoPatologicos.natal}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Neonatal o Postnatal"
                                name="antecedentes.personalesNoPatologicos.neonatalPostnatal"
                                value={formData.antecedentes.personalesNoPatologicos.neonatalPostnatal}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Crecimiento"
                                name="antecedentes.personalesNoPatologicos.crecimiento"
                                value={formData.antecedentes.personalesNoPatologicos.crecimiento}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Desarrollo"
                                name="antecedentes.personalesNoPatologicos.desarrollo"
                                value={formData.antecedentes.personalesNoPatologicos.desarrollo}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Inmunizaciones"
                                name="antecedentes.personalesNoPatologicos.inmunizaciones"
                                value={formData.antecedentes.personalesNoPatologicos.inmunizaciones}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Alimentación"
                                name="antecedentes.personalesNoPatologicos.alimentacion"
                                value={formData.antecedentes.personalesNoPatologicos.alimentacion}
                                onChange={handleChange}
                            />
                            <TextArea
                                label="Hábitos"
                                name="antecedentes.personalesNoPatologicos.habitos"
                                value={formData.antecedentes.personalesNoPatologicos.habitos}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Gineco-Obstétricos, con disabled según el sexo */}
                        <div className="mt-4">
                            <h5 className="text-lg font-semibold mb-2">Gineco-Obstétricos</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Menarquia"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.menarquia"
                                    type="text"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.menarquia}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Ciclos Menstruales"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.ciclosMenstruales"
                                    type="text"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.ciclosMenstruales}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Última Menstruación"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.ultimaMenstruacion"
                                    type="date"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.ultimaMenstruacion}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Anticonceptivos/Terapia Hormonal"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.anticonceptivos"
                                    type="text"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.anticonceptivos}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Gestas"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.gestas"
                                    type="number"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.gestas}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Partos"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.partos"
                                    type="number"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.partos}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Cesáreas"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.cesareas"
                                    type="number"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.cesareas}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Abortos"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.abortos"
                                    type="number"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.abortos}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                                <Input
                                    label="Hijos Vivos"
                                    name="antecedentes.personalesNoPatologicos.ginecoObstetricos.hijosVivos"
                                    type="number"
                                    value={formData.antecedentes.personalesNoPatologicos.ginecoObstetricos.hijosVivos}
                                    onChange={handleChange}
                                    disabled={isMasculino}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Socio-Personales */}
                    <div>
                        <TextArea
                            label="Socio-Personales"
                            name="antecedentes.socioPersonales"
                            value={formData.antecedentes.socioPersonales}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                {/* Historial de Ingresos */}
                <section>
                    <h3 className="text-2xl font-medium mb-4">Historial de Ingresos</h3>
                    <p className="text-gray-500">No hay ingresos registrados.</p>
                </section>

                {/* Botón de Enviar */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PatientRecordForm
