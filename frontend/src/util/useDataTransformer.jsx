import { useMemo } from 'react';

const useDataTransformer = (inputData, id) => {
  // 날짜를 N일 전으로 계산하는 함수
  const getFormattedDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const year = String(date.getFullYear()).slice(2); // 마지막 두 자리 연도

    return `${day}.${month}.${year}`;
  };

  const transformedData = useMemo(() => {
    return [
      {
        id: id,
        data: Object.entries(inputData).map(([key, value]) => {
          const match = key.match(/^DAY(\d+)$/);
          const daysAgo = match ? parseInt(match[1], 10) - 1 : 0;
          const formattedKey = match ? getFormattedDate(daysAgo) : key;

          return {
            x: formattedKey,
            y: parseInt(value, 10)
          };
        })
      }
    ];
  }, [id, inputData]);

  return transformedData;
};

export default useDataTransformer;
