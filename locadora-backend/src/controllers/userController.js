const { v4: uuidv4 } = require('uuid');
const knex = require('../database/knex');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
          return res.status(400).json({ error: 'E-mail já está em uso!' });
        }

        const [userId] = await knex('users').insert({
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            created_at: knex.fn.now()
        });

        return res.status(201).json({ message: 'Usuário criado!', userId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { register };
