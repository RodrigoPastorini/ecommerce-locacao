const db = require('../database/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
      }
  
      const user = await db('users').where({ email }).first();
      if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos!' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos!' });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
      );
      console.log('Token gerado:', token);
  
      return res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = { login };
  