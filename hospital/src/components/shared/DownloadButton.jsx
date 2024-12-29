import PropTypes from 'prop-types'

const DownloadButton = ({
  label,
  onDownload,
  icon: Icon,
  bgColor = 'bg-blue-600'
}) => {
  return (
    <button
      onClick={onDownload}
      className={`flex items-center gap-2 px-6 py-3 ${bgColor} hover:brightness-90 text-white font-semibold rounded-xl transition-all duration-300 shadow-md`}
    >
      <Icon size={50} />
      <span>{label}</span>
    </button>
  )
}

DownloadButton.propTypes = {
  label: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  bgColor: PropTypes.string,
}

export default DownloadButton
