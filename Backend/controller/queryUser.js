
export const queryUser = async (connection, email) => {
    try {
        let [rows] = await connection.execute(
            `SELECT * FROM users WHERE emailId = ?`,
            [email]
        );
        return rows
    } catch(err) {
        console.log(err)
        throw err;
    }
}

export const insertIntoUsers = async (connection, profile) => {
    try {
        await connection.execute(`Insert Into users (emailId,name,profilePicture) values (?,?,?)`,
            [profile._json.email, profile._json.name, profile._json.picture])
    } catch(err) {
        console.log(err)
        throw err;
    }
}


