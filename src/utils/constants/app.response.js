// class-constructor ----------------------------------->
class AppResponse {
    constructor(
        message,
        {
            success = false,
            status = 200,
            code = 'OK',
            data = {},
            details = null,
        } = {}
    ) {
        this.success = success;
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.details = details;
        this.timestamp = new Date().toISOString;
    }
}

// export module --------------------------------------->
export default AppResponse;
