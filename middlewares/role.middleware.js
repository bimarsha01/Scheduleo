
export const isbusiness = (req, res, next) => {
    if (req.user.role !== 'Business')
        return res.status(403).json({
            success: false,
            message: "User is not authorized"
        });
    next();
}
export const iscustomer = (req, res, next) => {
    if (req.user.role !== 'Customer')
        return res.status(403).json({
            success: false,
            message: "You havenot signed in yet sign up first"
        });
    next();
}
