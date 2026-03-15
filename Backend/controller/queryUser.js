
export const queryUser = async (connection, email) => {
    let [rows] = await connection.execute(
        `SELECT * FROM users WHERE emailId = ?`,
        [email]
    );
    console.log(rows.length)
    if (rows.length == 0) {
        return false
    } else { return true }
}

// CREATE TABLE IF NOT EXISTS users (
// id INT AUTO_INCREMENT PRIMARY KEY,
// emailId VARCHAR(255) NOT NULL,
// name VARCHAR(255) NOT NULL,
// admin BOOLEAN DEFAULT FALSE,
// password VARCHAR(255),
// profilePicture VARCHAR(255),
// driverRating FLOAT DEFAULT 0,
// riderRating FLOAT DEFAULT 0,
// driverRatedCount INT DEFAULT 0,
// riderRatedCount INT DEFAULT 0
// )

export const insertIntoUsers = async (connection, profile) => {
    await connection.execute(`Insert Into users (emailId,name,profilePicture) values (?,?,?)`,
        [profile._json.email, profile._json.name, profile._json.picture])
}


