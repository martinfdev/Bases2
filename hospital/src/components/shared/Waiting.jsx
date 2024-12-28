
const LoadingView = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="text-gray-700 text-lg font-medium">Espere por favor...</p>
      </div>
    </div>
  )
}

export default LoadingView
