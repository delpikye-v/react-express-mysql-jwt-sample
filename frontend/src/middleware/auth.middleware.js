export default function authHeader() {
    try {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        if (userToken) {
            return { Authorization: 'Bearer ' + userToken }; // or x-access-token
        } else {
            return {};
        }
    } catch {
        return {}
    }
}
