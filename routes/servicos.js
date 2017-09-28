const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/orcamento', (req, res, next) => {
  db('servicos').then((servico) => {
    res.render('servico/orcamento', {
      servicos: servico
    })
  },next)
})

// historico do cliente
router.get('/cadastro/:id', (req, res, next) => {
  const {id} = req.params

  db('servicos')
    .where('id', id)
    .first()
    .then((servico) => {
      if(!servico){
        return res.send(400)
      }
      res.render('servico/cadastro', {
        servico: servico
      })
    },next)
})

// rota vai definir a página a ser exibida para que o usuário consida cadastra novo cliente
router.get('/add', (req, res, next) => {
  res.render('servico/add')
})

// recebe os dados para inserção de uma nova tarefa no banco de dados
router.post('/add', (req, res, next) => {
  db('servicos').insert(req.body).then((ids) => {
    res.redirect('servico/orcamento')
  },next)
})

// rotas definirão a página apresentada ao usuário autenticado, para que possa altera os valores
router.get('/edit/:id', (req, res, next) => {
  const {id} = req.params

  db('servicos')
    .where("id", id)
    .first()
    .then((servico) => {
      if(!servico){
        return res.send(400);
      }
      res.render('servico/edit.ejs', {
        servico: servico
      })
    },next)
})

router.put('/edit/:id', (req, res, next) => {
  const {id} = req.params

  db('servicos')
    .where('id', id)
    .update(req.body)
    .then((result) => {
      if(result === 0){
        return res.send(400)
      }
      res.redirect('servico/orcamento')
    },next)
})

// rota define as operações para que um usuário autenticado possa excluir uma tarefa
router.delete('/delete/:id', (req, res, next) => {
  const {id} = req.params

  console.log('deletando' + id)
  db('servicos')
    .where('id', id)
    .delete()
    .then((result) => {
      if(result === 0){
        return res.send(400)
      }
      res.redirect('servico/orcamento')
    },next)
})


module.exports = router;












