import { useEffect, useState } from 'react';

import { checkApiHealth } from '../utils/api';

export function useApiHealth() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [appName, setAppName] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    checkApiHealth()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setStatus(data.status === 'ok' ? 'online' : 'offline');
        setAppName(data.app || null);
      })
      .catch(() => {
        if (isMounted) {
          setStatus('offline');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { status, appName };
}
