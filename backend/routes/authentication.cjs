const { get_db } = require("../database/get_db.cjs");

const { 
    login,
    register,
    logout_user_with_token,
    get_user_by_token
} = require("../database/user_operations.cjs");

const checkLogin = async (req, res, next) => {
    const db = get_db();
    await db.connect();
    console.log(req.cookies);
    if(req.cookies['user'])
    {
        try {
            const result = await get_user_by_token(db, req.cookies['user']);
            req['user'] = result.user;
            req['type'] = result.type;
            console.log("==========")
            console.log(req.path);
            console.log(req['type'], req['user']);
            db.end();
        }catch(err){
            db.end();
            console.log(err);
            delete req.cookies['user'];
        }
    }
    next();
}

const loginRoute = async (req, res) => {
    const db = get_db();
    await db.connect();
    
    try{
        const {token, type} = await login(db, req.body);
        res.cookie('user', token);
        await db.end();
        res.status(201).json(type);
    }catch(err) {
        await db.end();
        console.log(err);
        if(err.json)
            return res.status(err.status).json(err.json);
        return res.status(500).json('Unexpected error occured');
    }
}

const logoutRoute = async (req, res) => {
    const db = get_db();
    await db.connect();
    try{
        console.log('aaaaaa')
        await logout_user_with_token(db, req.cookies['user']);
        res.clearCookie('user');
        await db.end();
        res.status(200).json('Logged out');
    }catch(err) {
        await db.end();
        console.log(err);
        if(err.json)
            return res.status(err.status).json(err.json);
        return res.status(500).json('Unexpected error occured');
    }

}

const isConnected = (req, res)=> {
    if(req.cookies['user'])
    {
        console.log(req.type);
        res.status(200).json(req['type']);
        return;
    }

    res.status(404).json('not_logged');
    return;
}

const registerRoute = async (req, res) => {
    const db = get_db();
    await db.connect();
    try{
        const {token, type} = await register(db, req.body);
        res.cookie('user', token);
        await db.end();
        res.status(201).json(type);
    }catch(err) {
        await db.end();
        console.log(err);
        if(err.json)
            return res.status(err.status).json(err.json);
        return res.status(500).json('Unexpected error occured');
    }
}

module.exports = {
    registerRoute,
    loginRoute,
    logoutRoute,
    isConnected,
    checkLogin
}