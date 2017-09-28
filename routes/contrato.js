const express = require('express');
const router = express.Router();
const db = require('../db')


router.get('/contratos', (req, res, next) => {
  db('contratos').then((contrato) => {
    res.render('contrato/contratos', {
      contratos: contrato
    })
  },next)
})


router.get('/contrato/:id', (req, res, next) => {
  const {id} = req.params

  db('contratos')
    .where('id',id)
    .first()
    .then((contrato) => {
      if(!contrato){
        return res.send(400)
      }
      res.render('contrato/contrato', {
        contrato: contrato
      })
    },next)
})

// rota vai definir a página a ser exibida para que o usuário consida cadastra novo cliente
router.get('/adcontrato', (req, res, next) => {  
    res.render('contrato/adcontrato')  
})

// recebe os dados para inserção de uma nova tarefa no banco de dados
router.post('/adcontrato', (req, res, next) => {
  db('contratos').insert(req.body).then((ids) => {
    res.redirect('home')
  },next)
})


// rotas definirão a página apresentada ao usuário autenticado, para que possa altera os valores
router.get('/edit_contrato/:id', (req, res, next) => {
  const {id} = req.params

  db('contratos')
    .where('id',id)
    .first()
    .then((contrato) => {
      if(!contrato){
        return res.send(400)
      }
      res.render('contrato/edit_contrato.ejs', {
        contrato: contrato
      })
    },next)
})

router.put('/edit_contrato/:id', (req, res, next) => {
  const {id} = req.params

  db('contratos')
    .where('id', id)
    .update(req.body)
    .then((result) => {
      if(result === 0){
        return res.send(400)
      }
      res.redirect('/contratos')
    },next)
})

// rota define as operações para que um usuário autenticado possa excluir uma tarefa
router.delete('/delete_contrato/:id', (req, res, next) => {
  const {id} = req.params

  console.log('deletando' + id)
  db('contratos')
    .where('id',id)
    .delete()
    .then((result) => {
      if(result === 0){
        return res.send(400)
      }
      res.redirect('/contratos')
    },next)
})







module.exports = router










