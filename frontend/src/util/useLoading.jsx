import { useState, useEffect } from 'react';

function useLoading(url, type) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, { credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                switch (type) {
                    case 'json':
                        return response.json();
                    case 'text':
                        return response.text();
                    case 'blob':
                        return response.blob();
                    case 'arrayBuffer':
                        return response.arrayBuffer();
                    case 'formData':
                        return response.formData();
                    case 'image':
                        // Assuming 'image' means 'blob' for images
                        return response.blob();
                    case 'map':
                        // Assuming 'map' means 'text' for text-based maps or other custom handling
                        return response.text();
                    default:
                        throw new Error('Unsupported type');
                }
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url, type]);

    return { data, loading, error };  // 객체 형태로 반환
}

export default useLoading;
