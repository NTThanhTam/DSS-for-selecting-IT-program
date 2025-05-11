import {
    getUserByUsername,
    saveUser
} from "../DB/queries.js";
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await getUserByUsername(username);
        console.log(user)
        if (user.length > 0){
            const user_id = user[0].user_id;
            const user_role = user[0].role;
            if (password == user[0].password) {
                const accessToken = jwt.sign({id: user_id, role: user_role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 })
                return res.status(200).send({ auth: true, accessToken, Status: "Success", user_id, user_role });
            } else {
                return res.json({Error: "Password not matched"})
            }
        } else {
            return res.json({Error: "No username existed"})
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }
};

export const regiter = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await saveUser(username, password, 'student')
        return res.status(200).json({user})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }
};