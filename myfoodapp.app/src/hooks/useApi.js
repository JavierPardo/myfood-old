import {useEffect, useState} from "react";

const useApi = (apiFunc) => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunc(...args);
        console.log('response', response);
        setLoading(false);
        if (!response.ok) return setError(true);
        setData(response.data);
        setError(false);
    };

    return {data, error, loading, request};
};
export default useApi;
