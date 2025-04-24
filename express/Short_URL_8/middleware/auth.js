//cookies are used only for browser based project ..and only available to browser
//jwt token in a standard way .. in which we use authorization header to pass token as response 
//like -- authorization: Bearer <token>


const { getUser } = require("../service/auth");


// by cookie - better way
//THis is Authentication
function checkForAuthentication(req, res, next){

    const tokenCookie = req.cookies.token;
    req.user = null;
    if(!tokenCookie )
        return next();

    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next() ;
}

//This is Authorization
function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    };
}










//by cookie - first way

// async function restrictToLoggedInUserOnly(req, res, next) {
//     // console.log(req);
//     const uid = req.cookies?.uid;
//     if (!uid) {
//         return res.redirect("/login");
//     }

//     const user = getUser(uid);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const uid = req.cookies?.uid;
    
//     const user = getUser(uid);
    
//     req.user = user;
//     next();
// }



//by header - first way

// async function restrictToLoggedInUserOnly(req, res, next) {
//     // console.log(req);
//     console.log(req.headers);
//     const uid = req.headers['authorization'];
//     if (!uid) {
//         return res.redirect("/login");
//     }

//     const token = uid.split("Bearer ")[1];  //Bearer hfurh3476r377r8f ->  ['', 'hfurh3476r377r8f']
//     const user = getUser(token);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     console.log(req.headers);
//     const uid = req.headers['authorization'];
//     const token = uid.split("Bearer ")[1];
//     const user = getUser(token);
    
//     req.user = user;
//     next();
// }



//better way
// function checkForAuthentication(req, res, next){

//     req.user = null;
//     const authorizationHeaderValue = req.headers["authorization"];
//     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
//         return next();

//     const token = authorizationHeaderValue.split("Bearer ")[1];
//     const user = getUser(token);
//     req.user = user;
//     return next ;
// }

// function restrictTo(roles = []){
//     return function(req, res, next){
//         if(!req.user) return res.redirect("/login");

//         if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

//         return next();
//     };
// }








module.exports = {
    // restrictToLoggedInUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,

};