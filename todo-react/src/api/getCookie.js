export const getCsrfToken = () => {
    const cookie = document.cookie
        .split("; ")
        .find((value) => value.startsWith("XSRF-TOKEN="));

    if (!cookie) {
        return "";
    }

    return decodeURIComponent(
        cookie.substring("XSRF-TOKEN=".length)
    );
};
