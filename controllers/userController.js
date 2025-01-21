const bcrypt = require('bcrypt');
const { json } = require('body-parser');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            res.status(200).json(rows);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ msg: 'Server error' });
        }

    },

    createUser: async (req, res) => {
        try {
            const { username, password, fname, lname } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);

            // check existing user
            const checkUserQuery = "SELECT * FROM users WHERE username = ?";
            const [existingUser] = await db.query(checkUserQuery, [username]);

            if (existingUser.length > 0) {
                return res.status(400).json({
                    msg: `username: ${username} already exists`,
                });
            }

            // create new user
            const insertQuery = "INSERT INTO users (username, password, fname, lname) VALUES (?, ?, ?, ?)";
            const [insertResult] = await db.query(insertQuery, [username, hashPassword, fname, lname]);
            res.status(201).json({
                msg: `User ${username} created successfully.`,
            });

        } catch (err) {
            console.log('Error:', err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        const checkUserQuery = "SELECT * FROM users WHERE id = ?";
        const [result] = await db.execute(checkUserQuery, [id]);

        if (result.length > 0) {
            return res.status(200).json(result)
        }


    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { fname, lname } = req.body;

        try {
            const query = "UPDATE users SET fname = ?, lname = ? WHERE id = ?"
            const [result] = await db.execute(query, [fname, lname, id]);

            if (result.affectedRows > 0) {
                return res.json({ msg: 'update successfully.' })
            }

            res.status(200).json({
                msg: 'not found',
            });

        } catch (err) {
            // ถ้ามีข้อผิดพลาดเกิดขึ้น ให้ log ข้อความผิดพลาดและส่ง response กลับ
            console.error(err.message);
            return res.status(500).json({ msg: 'Server error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const query = "DELETE FROM users WHERE id = ?"
            const [result] = await db.execute(query, [id]);

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: `User ${id} deleted successfully` });
            }
            return res.status(404).json({ message: `User with ID ${id} not found` });

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ msg: 'ServerError' })
        }
    },

}