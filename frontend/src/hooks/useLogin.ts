import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

type LoginSchema = z.infer<typeof loginSchema>

export function useLogin() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (loginData: LoginSchema) => {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Account does not exist')
                } else if (response.status === 401) {
                    throw new Error('Invalid password')
                } else {
                    throw new Error(result.message || 'Login failed')
                }
            }

            return result
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            window.location.href = '/'
            setErrorMessage(null)
        },
        onError: (error: any) => {
            toast.error(error.message, {
                position: 'top-right'
            })
            setErrorMessage(error.message || 'Login failed')
        },
    })

    const onsubmit = (loginData: LoginSchema) => {
        setErrorMessage(null)
        mutate(loginData)
    }

    return {
        register,
        handleSubmit,
        onsubmit,
        errors,
    }
}
