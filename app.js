/* Objetivo: criar uma api para responder os dados da empresa JENGT, no projeto
/*           ProVest
* Data: 03/09/2024
* Autor: Gabriela Fernandes e Eduardo Gonçalves
* Versão: 1.0
*****************************************************************************/

// Para fazer as integracoes com o banco de dados, precisamos ultilizar uma dependencia
// SEQUELIZE    ORM
// PRISMA       ORM
// FASTFY       ORM

// prisma

// npm install prisma --save
// npm install @prisma/client --save


// npx prisma init

// imports de bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// // #region USUARIO

// /****************************** USUARIO ****************************/
// // endpoints: listar os usuarios
// app.get('/v1/leilao_expresso/usuarios', cors(), async(request, response, next) => {
//     // chama a função para retornar os dados dos usuarios
//     let dadosUsuarios = await controllerUsuarios.getListarUsuarios()

//     response.status(dadosUsuarios.status_code)
//     response.json(dadosUsuarios)
// })

// // endpoint: retorna os dados de usuarios, filtrando pelo ID
// app.get('/v1/leilao_expresso/usuarios/:id', cors(), async(request, response, next) => {
//     // recebe o id da requisição do admin
//     let idUsuarios = request.params.id

//     let dadosUsuarios = await controllerUsuarios.getBuscarUsuario(idUsuarios)

//     response.status(dadosUsuarios.status_code)
//     response.json(dadosUsuarios)
// })

// // endpoint: inserir novos Usuarios no Banco de Dados
// // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
// app.post('/v1/leilao_expresso/usuarios', cors(), bodyParserJSON, async(request, response, next) => {

//     // recebe o content type da requisição (A API deve receber somente application/json)
//     let contentType = request.headers['content-type']

//     //recebe os dados encaminhados na requisição no body(JSON)
//     let dadosBody = request.body

//     // encaminha os dados da requisição para a controller enviar para o BD
//     let resultDados = await controllerUsuarios.setNovoUsuario(dadosBody, contentType)

//     response.status(resultDados.status_code)
//     response.json(resultDados)

// })

// // endpoint: editar o status de usuarios para false para "exclui-lo"
// app.put('/v1/leilao_expresso/usuarios/excluir/:id', cors(), async(request, response, next) => {
//     let usuario = request.params.id
//     let dadosUsuario = await controllerUsuarios.setExcluirUsuario(usuario)

//     response.status(dadosUsuario.status_code)
//     response.json(dadosUsuario)
// })

// // endpoint: editar o status de usuarios para false para "ativa-lo"
// app.put('/v1/leilao_expresso/usuarios/ativar/:id', cors(), async(request, response, next) => {
//     let usuario = request.params.id
//     let dadosUsuario = await controllerUsuarios.setExcluirUsuario(usuario)

//     response.status(dadosUsuario.status_code)
//     response.json(dadosUsuario)
// })

// // endpoint: editar os dados da categoria
// app.put('/v1/leilao_expresso/usuarios/:id', cors(), bodyParserJSON, async(request, response, next) => {
//     let usuario = request.params.id

//     // recebe o content type da requisição (A API deve receber somente application/json)
//     let contentType = request.headers['content-type']

//     //recebe os dados encaminhados na requisição no body(JSON)
//     let dadosBody = request.body

//     // encaminha os dados da requisição para a controller enviar para o BD
//     let resultDados = await controllerUsuarios.setAtualizarUsuario(dadosBody, contentType, usuario)

//     response.status(resultDados.status_code)
//     response.json(resultDados)
// })

// app.post('/v1/leilao_expresso/validacao/usuario', cors(), bodyParserJSON, async (request, response, next) => {

//     let contentType = request.headers['content-type']
//     let dadosBody = request.body
//     let dadosUsuario = await controllerUsuarios.getValidarUsuario(dadosBody.email, dadosBody.senha, contentType)
//     response.status(dadosUsuario.status_code);
//     response.json(dadosUsuario)

// })

// /*************************************************************************/
