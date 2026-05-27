const roleMiddleware = (...allowedRoles) => {

    return (req, res, next) => {

        try {

            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {

                const requiredRoles = allowedRoles.join(" or ");

                return res.status(403).json({
                    success: false,
                    message: `${requiredRoles} access only`
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};

module.exports = roleMiddleware;