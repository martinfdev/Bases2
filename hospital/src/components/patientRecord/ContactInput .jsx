import PropTypes from 'prop-types'
import Input from '../common/Input'

const ContactInput = ({ index, value, onChange }) => (
    <div className="border p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">Contacto {index}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="nombre" name={'nombre'} type="text" value={value} onChange={onChange} />
            <Input label="relacion" name={'relacion'} type="text" value={value} onChange={onChange} />
            <Input label="telefono" name={'telefono'} type="tel" value={value} onChange={onChange} />
        </div>
    </div>
)

ContactInput.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func,
}

export default ContactInput