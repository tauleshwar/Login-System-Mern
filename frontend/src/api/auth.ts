// src/api/auth.ts
export const login = async (email: string, password: string): Promise<{ token: string }> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }
  
    return res.json();
  };
  