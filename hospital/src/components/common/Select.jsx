import PropTypes from 'prop-types'

const Select = ({ label, name, type, value, onChange, options }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
            {label}
        </label>
        <select
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

Select.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })
    ),
}

export default Select