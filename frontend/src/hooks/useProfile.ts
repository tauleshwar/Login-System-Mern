import { useQuery } from '@tanstack/react-query'

export interface Profile {
    email: string
}

export function useProfile() {
    const token = localStorage.getItem('token')

    const {
        data: profile,
        error,
        isLoading,
        isError,
        refetch,
    } = useQuery<Profile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                throw new Error('Failed to fetch profile')
            }

            return res.json()
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    return {
        profile,
        isLoading,
        isError,
        error,
        refetch,
    }
}
