const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        
        if (!tokenCookieValue) {
            return next(); // ✅ add return here
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error("Invalid Token:", error);
            // optional: you can clear cookie if token invalid
            res.clearCookie(cookieName);
        }
        
        return next(); // ✅ keep return here as well
    };
}



module.exports = {
    checkForAuthenticationCookie,
};