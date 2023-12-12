import { Router }  from 'express';


const router = Router();

router.get('/', (req, res) => {     
   if(!req.session.user){
     return res.redirect('/login')
   }
    res.redirect('/dbproducts');
 });


router.get('/profile', (req, res) => {     
  if(!req.session.user){
    return res.redirect('/login')
  }
   res.redirect('/dbproducts');
});

router.get('/login', (req, res) => {     
   res.render('login', {title: 'Bienvenido', });
});

router.get('/register', (req, res) => {     
   res.render('register', {title: 'Bienvenido', });
});



export default router;