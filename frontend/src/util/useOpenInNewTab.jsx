import { useCallback } from 'react';

const useOpenInNewTab = (URL) => {
  return useCallback(() => {
    window.open(URL, '_blank');
  }, [URL]);
};

export default useOpenInNewTab;