import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
            <div className="absolute inset-0 animate-gradient-bg"></div>
            <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
                    Hospital
                </h2>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage