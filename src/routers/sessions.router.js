import { Router } from "express";
import UserModel from "../dao/models/user.model.js";


const router = Router();

router.post("/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.render('error', { title: 'Bienvenido✋', messageError: 'Todos los campos son requeridos' });
  }

  let user;
  let role = 'user'; // Por defecto, el rol es 'user'

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    // Si las credenciales coinciden con el administrador
    role = 'admin'; // El rol será 'admin'
  } else {
    // Si no es el administrador, busca en la base de datos
    user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.render('error', { title: 'Bienvenido✋', messageError: 'Correo o contraseña inválidos' });
    }
    // Obtener el rol del usuario de la base de datos
    role = user.role || 'user'; // Si el usuario no tiene un rol especificado, se asigna 'user' por defecto
  }

  if (!user && role !== 'admin') {
    return res.render('error', { title: 'Bienvenido✋', messageError: 'Correo o contraseña inválidos' });
  }

  const { first_name, last_name, age } = user || {};

  req.session.user = {
    first_name,
    last_name,
    email,
    age,
    role,
  };

  res.redirect('/profile');
});

router.post("/register", async(req, res) => {
    const {
      body: 
      { first_name, last_name, email, password, age,},
    } = req;
  
    if( 
      !first_name||
      !last_name||
      !email||
      !password
      ){
          //return res.status(400).json ({message: 'todos los campos son requeridos'})
          return res.render('error', {title: 'Bienvenido✋', messageError:'todos los campos son requeridos'})
        }
  
      const user = await UserModel.create({
          first_name, 
          last_name, 
          email, 
          password, 
          age});
  
      //res.status(201).json(user);
      res.redirect('/login');
  
  });

  router.get('/me', (req, res)=>{
    if(!req.session.user){
      return res.status(401).json({message: 'No estas autenticado.'});
    }
    res.status(200).json(req.session.user)
  });
  
  router.get('/logout', (req, res) => {
    req.session.destroy((error)=>{
      if(error){
        return res.render('error', {title: 'Bienvenido✋', messageError: error.message})
      }
      res.redirect('/login');
    })
  });

export default router;



