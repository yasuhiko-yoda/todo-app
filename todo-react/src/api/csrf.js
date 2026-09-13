const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let csrfToken = "";
let csrfRequest = null;

export const fetchCsrfToken = async () => {
    if (csrfRequest) {
        return csrfRequest;
    }

    csrfRequest = (async () => {
        const response = await fetch(`${API_BASE_URL}/csrf`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("CSRFトークンの取得に失敗しました。");
        }

        const data = await response.json();

        csrfToken = data.token;

        return data;
    })();

    try {
        return await csrfRequest;
    } finally {
        csrfRequest = null;
    }
};

export const getCsrfToken = () => csrfToken;