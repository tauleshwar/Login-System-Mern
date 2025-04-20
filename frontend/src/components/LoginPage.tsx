import LoginForm from './LoginForm'





function LoginPage() {



    return (
        <div className="home flex items-center justify-center min-h-screen">

            <div className="w-full max-w-xs">
                <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome back!</h1>
                <LoginForm />

            </div >
        </div >
    )
}

export default LoginPage
