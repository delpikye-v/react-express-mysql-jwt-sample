import axios from "axios";

class AuthService {
    static async registeUser(user_name, email) {
        return new Promise((resovle) => {
            try {
                axios
                    .post("/auth/sign-up", { user_name, email })
                    .then(() => resovle({ error: false }))
                    .catch(({ response }) => resovle(response.data));
            } catch (ex) {
                resovle({ error: true, message: "Something wrong!" });
            }
        });
    }

    static async loginUser(user_name, password) {
        let data = { user_name, password }
        return new Promise((resovle) => {
            try {
                axios
                    .post("/auth/sign-in", data)
                    .then(response => resovle(response.data))
                    .catch(({ response }) => resovle(response.data));
            } catch (ex) {
                resovle({ error: true, message: "Something wrong!" });
            }
        });
    }
}

export default AuthService;
