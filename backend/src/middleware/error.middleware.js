function errorMiddleware(
    error,
    req,
    res,
    _next
) {
    const status = error.status || 500
    const message = error.message || 'Something went wrong!'
    const isErr = error.error
    res.status(status).send({
        status,
        message,
        error: isErr
    })
}
export default errorMiddleware