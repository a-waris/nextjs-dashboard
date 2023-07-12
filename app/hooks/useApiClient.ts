'use client';
import ApiClient from '@/clients/apiClient';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

function useApiClient(baseUrl: string) {
  const { data: session, status } = useSession();
  const [client, setClient] = useState<ApiClient>();

  useEffect(() => {
    if (status != 'loading' && session) {
      const client = new ApiClient(baseUrl);
      client.setAuthToken(session?.user?.accessToken);
      setClient(client);
    }
  }, [baseUrl]);

  return client;
}

export default useApiClient;
