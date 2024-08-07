import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useSendPost(url, initialForm, type = 'json', isFormData = false) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const postRequest = useCallback(async (form) => {
        setLoading(true);
        setError(null);

        try {
            let body;
            let headers = {};

            if (isFormData) {
                body = form; // FormData 객체를 그대로 사용
            } else {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(form); // JSON 형식으로 변환
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: isFormData ? undefined : headers,
                body,
                credentials: 'include', // 쿠키를 포함하여 요청
            });

            const responseText = await response.text();
            console.log('Server Response:', responseText); // 서버 응답 출력

            if (!response.ok) {
                if (response.status === 499) {
                    await postRequest(form); // 토큰 만료 시 재요청 시도
                    return;
                }
                if (response.status === 404) {
                    navigate('/notFound');
                    return;
                }
                if (response.status === 403) {
                    navigate('/notAuthorized');
                    return;
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result;
            switch (type) {
                case 'json':
                    result = JSON.parse(responseText);
                    break;
                case 'text':
                    result = responseText;
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
                    result = responseText; // 텍스트 기반의 맵 처리
                    break;
                default:
                    throw new Error('Unsupported type');
            }

            setData(result);
        } catch (error) {
            if (error.name === 'SyntaxError') {
                setError(`Unexpected response format: ${error.message}`);
            } else {
                setError(error.message || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [url, type, navigate, isFormData]);

    return { data, loading, error, postRequest };
}

export default useSendPost;
