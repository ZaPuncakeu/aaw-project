const bcryptjs = require('bcryptjs');
const numSaltRounds = 10;

bcryptjs.hash('admin', numSaltRounds).then(console.log)
const jwt = require('jsonwebtoken');
const secret = 'AAW_THE_ZOO';

const fetch_users = (db) => {

}

const fetch_users_by_email = (db, email) => {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await db.query('SELECT * FROM users WHERE email=$1', [email]);
            resolve(res.rows);
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const fetch_admin_by_email = (db, email) => {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await db.query('SELECT * FROM admin WHERE email=$1', [email]);
            resolve(res.rows);
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const login = (db, data) => {
    let type;
    let id;
    let password;
    return new Promise(async (resolve, reject) => {
        try {
            const user = await fetch_users_by_email(db, data['email']);
            if(user.length == 0)
            {
                const admin = await fetch_admin_by_email(db, data['email']);
                if(admin.length == 0)
                {
                    return reject({
                        status: 404,
                        json: {
                            message: "Email or password are incorrect",
                            input: 'all',
                            status: 'failure'
                        }
                    })
                }

                id = admin[0].id_admin;
                type = 'admin';
                password = admin[0].pass;
            }
            else 
            {
                id = user[0].id_user;
                type = 'user';
                password = user[0].pass;
            }

            if(await bcryptjs.compare(data['password'], password))
            {
                const token = jwt.sign({id, type}, secret);
                await add_token(db, token);
                return resolve({token, type});
            }

            return reject({
                status: 404,
                json: {
                    message: "Email or password are incorrect",
                    input: 'all',
                    status: 'failure'
                }
            });
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const add_token = (db, token) => {
    return new Promise(async (resolve, reject) => {
        try{
            const date = new Date();
            await db.query('INSERT INTO tokens(token, created_at, updated_at) VALUES($1, $2, $3)', [
                token,
                date.toString(),
                date.toString()
            ]);
            resolve(true);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const insert_user = (db, data) => {
    return new Promise(async (resolve, reject) => {
        
        try {
            await db.query('INSERT INTO users(fullname, email, pass) VALUES($1, $2, $3)', [
                data['fullname'],
                data['email'],
                await bcryptjs.hash(data['password'], numSaltRounds)
            ]);

            resolve(true);
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const register = (db, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await fetch_users_by_email(db, data['email']);
            if(user.length > 0)
            {
                return reject({
                    status: 409,
                    json: {
                        message: 'Email already in use',
                        status: 'failure',
                        input: "email"
                    }
                })
            }
            
            user = await fetch_admin_by_email(db, data['email']);
            if(user.length > 0)
            {
                return reject({
                    status: 409,
                    json: {
                        message: 'Email already in use',
                        status: 'failure',
                        input: "email"
                    }
                })
            }

            await insert_user(db, data);
            const {token, type} = await login(db, data);
            return resolve({token, type});
        }catch(error) {
            console.log(error);
            return reject(error);
        }
    });
}

const get_user_by_token = (db, token) => {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await db.query('SELECT * FROM tokens WHERE token=$1', [token]);
            if(res.rows.length == 0)
            {
                return reject(false);
            }

            const t = jwt.verify(token, secret);
            return resolve({user: t.id, type: t.type});
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const logout_user_with_token = (db, token) => {
    console.log('logout');
    return new Promise(async (resolve, reject) => {
        try{
            const res = await db.query('DELETE FROM tokens WHERE token=$1', [token]);
            return resolve(true);
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = {
    fetch_users,
    fetch_users_by_email,
    get_user_by_token,
    logout_user_with_token,
    login,
    register
}