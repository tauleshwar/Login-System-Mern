
import { useLogin } from '../hooks/useLogin'
import { Toaster } from "sonner";


function LoginForm() {

    const { register, handleSubmit, errors, onsubmit } = useLogin()

    return (
        <>
            <Toaster richColors  />
            <form onSubmit={handleSubmit(onsubmit)} className="bg-white rounded px-4 pt-6 pb-8 mb-4">
                <div className="min-h-10 mb-2">

                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                </div>

                <input
                    {...register("email")}
                    className="mb-5 shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight outline-none focus:ring-2  focus:ring-gray-300 placeholder-gray-400"
                    id="email"
                    type="text"
                    placeholder="uid"
                />

                <input
                    {...register("password")}
                    className=" mb-10 shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700leading-tight outline-none focus:ring-2  focus:ring-gray-300 placeholder-gray-400"
                    id="password"
                    type="password"
                    placeholder="Password" />


                <button className="bg-[#2B3A67] hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg w-full" type="submit">
                    Login
                </button>

            </form>
        </>
    )
}

export default LoginForm