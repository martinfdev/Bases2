import PropTypes from 'prop-types'
const TextArea = ({ label, name, value, onChange }) => (
    <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor={name}>
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows="3"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
    </div>
)

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default TextArea