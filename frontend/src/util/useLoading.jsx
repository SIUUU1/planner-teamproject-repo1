import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useLoading(url, type) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(url, { credentials: 'include' });

                if (!response.ok) {
                    if (response.status === 499) {
                        await fetchData(); // 토큰 만료가 발생했을 때 재요청 시도
                        return; // 재요청 완료 후 추가 로직을 실행하지 않음
                    }
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                    if(response.status === 404){
                        navigate('/notFound');
                        return;
                    }
                    if(response.status === 403){
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
                        result = await response.blob(); // 이미지의 경우 'blob'으로 처리
                        break;
                    case 'map':
                        result = await response.text(); // 텍스트 기반의 맵 처리
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

        fetchData();
    }, [url, type, navigate]);

    return { data, loading, error };
}

export default useLoading;
