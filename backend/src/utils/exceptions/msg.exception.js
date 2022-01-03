import HttpException from './http.exception.js';

class MessageException {
    static badRequest() {
        return new HttpException(400, 'Bad request!')
    }

    static notAuth() {
        return new HttpException(401, 'Not auth permission!')
    }
}

export default MessageException