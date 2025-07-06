export const isauth = (req, res, next) => {
    try {
        const token = req.cookie.accesstoken;

        if (!token)
            return res.status(404).json({
                success: false,
                message: "Token not found "
            })
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode)
            return res.status(401).json({ error: "Token didnot matched" });

        req.user = { userID: decode.userID };
        next();
    }
    catch (err) {
        return res.status(createStatus.ERROR).json({
            success: false,
            message: "Something went wrong"
        })
    }

}