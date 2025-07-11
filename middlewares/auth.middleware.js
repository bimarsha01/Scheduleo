export const isauth = (req, res, next) => {
    try {
        const token = req.cookies.accesstoken;

        if (!token)
            return res.status(404).json({
                success: false,
                message: "Token not found "
            })
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode)
            return res.status(401).json({ error: "INVALID OR EXPIRED TOKEN " });

        req.user = { decode };
        next();
    }
    catch (err) {
        return res.status(createStatus.ERROR).json({
            success: false,
            message: "Something went wrong"
        })
    }

}