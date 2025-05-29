'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(() => {
    // Clear authentication cookie (adjust name if different)
    deleteCookie('token'); // 'token' is your auth cookie — change as needed

    // Optionally clear any app state (e.g., context/store)

    // Redirect to login or home page
    router.push('/login');
  }, [router]);

  return logout;
}
