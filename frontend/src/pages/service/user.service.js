import axios from "axios";

class UserService {
    static async list() {
        return new Promise((resovle) => {
            try {
                axios
                    .get("/users")
                    .then(response => resovle(response.data))
                    .catch(({ response }) => resovle(response.data));
            } catch (ex) {
                resovle({ error: true, message: "Something wrong!" });
            }
        });
    }

    static async delete(userId) {
        return new Promise((resovle) => {
            try {
                axios
                    .delete(`/users/${userId}`, )
                    .then(response => resovle(response.data))
                    .catch(({ response }) => resovle(response.data));
            } catch (ex) {
                resovle({ error: true, message: "Something wrong!" });
            }
        });
    }
}

export default UserService