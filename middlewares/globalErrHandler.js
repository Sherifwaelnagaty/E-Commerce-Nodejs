export const globalErrHandler = (err, req, res, next) => {
    //stack
    //message
    const stack = err?.stack;
    const message= err?.message;
    const status= err?.status || 500;
    res.status(status).json({
        stack,
        message,
    });
};
export const NotfoundHandler=(req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
}