import { useMemo } from 'react';

const useDataTransformer = (inputData, id) => {
  // 날짜를 N개월 전으로 계산하는 함수
  const getFormattedMonth = (monthsAgo) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - monthsAgo);

    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const year = String(date.getFullYear()).slice(2); // 마지막 두 자리 연도

    return `${year}.${month}`;
  };
  
  // 날짜를 N일 전으로 계산하는 함수
  const getFormattedDate = (daysAgo) => {
    const date = new Date();  // 새로운 Date 객체 생성
    date.setDate(date.getDate() - daysAgo);  // daysAgo 만큼 날짜를 감소

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const year = String(date.getFullYear()).slice(2); // 마지막 두 자리 연도

    return `${year}.${month}.${day}`;
  };

  const transformedData = useMemo(() => {
    return [
      {
        id: id,
        data: Object.entries(inputData).map(([key, value]) => {
          // 'DAY'로 시작하는 키 처리
          if (key.startsWith('DAY')) {
            const match = key.match(/^DAY(\d+)$/);
            const dayNumber = match ? parseInt(match[1], 10) : 1;
            const daysAgo = 7 - dayNumber; // DAY7이 오늘이므로 DAYS6은 1일 전, DAY1은 6일 전

            // 각 'DAY'에 맞는 날짜 계산
            const formattedKey = getFormattedDate(daysAgo);

            return {
              x: formattedKey,
              y: parseInt(value, 10)
            };
          }

          // 'MONTH'로 시작하는 키 처리
          if (key.startsWith('MONTH')) {
            const match = key.match(/^MONTH(\d+)$/);
            const monthsAgo = match ? 6 - parseInt(match[1], 10) : 0;
            const formattedKey = getFormattedMonth(monthsAgo);
            return {
              x: formattedKey,
              y: parseInt(value, 10)
            };
          }

          // 기본 처리 (key 그대로 사용)
          return {
            x: key,
            y: parseInt(value, 10)
          };
        })
      }
    ];
  }, [id, inputData]);

  return transformedData;
};

export default useDataTransformer;
