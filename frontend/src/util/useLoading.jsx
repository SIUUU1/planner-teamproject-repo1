import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useLoading(url, type) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 데이터 요청 함수
    const fetchData = async () => {
        try {
            let response = await fetch(url, { credentials: 'include' });

            if (!response.ok) {
                if (response.status === 499) {
                    await fetchData(); // 토큰 만료가 발생했을 때 재요청 시도
                    return; 
                }
                if (response.status === 403) {
                    navigate('/notAuthorized');
                    return;
                }
            }

            let result;
            switch (type) {
                case 'json':
                    result = await response.json();
                    break;
                case 'text':
                    result = await response.text();
                    break;
                case 'blob':
                    result = await response.blob();
                    break;
                case 'arrayBuffer':
                    result = await response.arrayBuffer();
                    break;
                case 'formData':
                    result = await response.formData();
                    break;
                case 'image':
                    result = await response.blob();
                    break;
                case 'map':
                    result = await response.text();
                    break;
                default:
                    throw new Error('Unsupported type');
            }

            setData(result);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'An error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, type, navigate]);

    // refetch 함수를 반환
    return { data, loading, error, refetch: fetchData };
}

export default useLoading;
