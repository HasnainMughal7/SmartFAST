export function InternalServerError (Response, error={message: "Unexpected Error Occured!"}) {
    console.log(error.message)
    return Response.status(500).json("Internal Server Error!");
}