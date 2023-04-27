class CustomAPIError extends Error{
    // constructor(message,statusCode){
    //     super(message)
    //     this.statusCode= statusCode
    // }
    constructor(message){
        super(message)
    }
}
module.exports= CustomAPIError