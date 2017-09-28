const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/imprimir', (req, res, next) => {
  db('contratos').then((contrato) => {
    res.render('imprimir', {
      contratos: contrato
    })
  },next)
})


router.get('/imprimir/:id', (req, res, next) => {
  const {id} = req.params

 db('contratos')
   .where('id', id)
   .first() 
   .then((contrato) => {
      if(!contrato){
        return res.send(400)
      }
      res.render('imprimir', {
        contrato: contrato
      })
    },next)
})

module.exports = router