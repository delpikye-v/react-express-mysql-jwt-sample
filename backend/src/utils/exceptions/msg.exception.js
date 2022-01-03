import HttpException from './http.exception.js';

class MessageException {
    static badRequest() {
        return new HttpException(400, 'Bad request!')
    }
}

export default MessageException