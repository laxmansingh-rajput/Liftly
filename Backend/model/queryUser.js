import connection from "../confiq/connection.js";
export const queryUserByEmail = async (email) => {
    try {
        let [rows] = await connection.execute(
            `SELECT * FROM users WHERE emailId = ?`,
            [email]
        );
        return rows
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const queryUserById = async (id) => {
    try {
        let [rows] = await connection.execute(
            `SELECT * FROM users WHERE Id = ?`,
            [id]
        );
        return rows[0]
    } catch (err) {
        console.log(err)
        throw err;
    }
}


export const insertIntoUsers = async (profile) => {
    try {
        await connection.execute(`Insert Into users (emailId,name,profilePicture) values (?,?,?)`,
            [profile._json.email, profile._json.name, profile._json.picture])
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const editProfile = async (name, password, id) => {
    try {
        await connection.execute(
            `UPDATE users SET name = ?, password = ? WHERE id = ?`,
            [name, password, id]
        );
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}


export const editPhone = async (phone, id) => {
    try {
        await connection.execute(
            `UPDATE users SET phoneNumber = ? WHERE id = ?`,
            [phone, id]
        );
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

