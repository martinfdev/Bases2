import PropTypes from 'prop-types'

const Input = ({ label, name, type, value, onChange, disabled, required }) => (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

export default Input

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
  }