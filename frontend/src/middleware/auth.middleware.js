export default function authHeader() {
    try {
        const tokenString = localStorage.getItem("user");
        const userToken = JSON.parse(tokenString) || {};
        if (userToken.accessToken) {
            return { Authorization: 'Bearer ' + userToken.accessToken }; // or x-access-token
        } else {
            return {};
        }
    } catch {
        return {}
    }
}
