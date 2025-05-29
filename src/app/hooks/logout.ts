// src/app/hooks/logout.ts
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { deleteCookie } from 'cookies-next'; // or your preferred cookie lib

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(() => {
    // Example: remove auth cookie/token
    deleteCookie('token');

    // Redirect to login or homepage
    router.push('/login');
  }, [router]);

  return logout;
}
