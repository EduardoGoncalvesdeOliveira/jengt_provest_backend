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

// criando objeto app
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', '*')
    app.use(cors())
    // app.use(express.json());
    next()
})

// cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

// #region IMPORTS
/****************************** IMPORT DE CONTROLLERS ****************************/
const controllerAluno = require('./controller/controller_alunos')
const controllerProf = require('./controller/controller-prof')
/*********************************************************************************/


// #region ALUNO
/****************************** ALUNO ****************************/
// endpoints: listar os admins
app.get('/v1/jengt_provest/alunos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosAlunos = await controllerAluno.getListarAlunos()

    response.status(dadosAlunos.status_code)
    response.json(dadosAlunos)
})

// endpoint: filtrar pelo nome
app.get('/v1/jengt_provest/alunos/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados do admin
    let dadosAlunos = await controllerAluno.getAlunoByNome(filtro)

    response.status(dadosAlunos.status_code)
    response.json(dadosAlunos)
})

// endpoint: retorna os dados do admin, filtrando pelo ID
app.get('/v1/jengt_provest/aluno/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getBuscarAluno(idAluno)

    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

// endpoint: inserir novos admins no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/aluno', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
    
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerAluno.setNovoAluno(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar o status do admin para false para "exclui-lo"
app.put('/v1/jengt_provest/admin/excluir/:id', cors(), async(request, response, next) => {
    let admin = request.params.id
    let dadosAdmin = await controllerAluno.setEditarExcluirAdmin(admin)

    response.status(dadosAdmin.status_code)
    response.json(dadosAdmin)
})

// endpoint: editar o status do admin para false para acha-lo
app.put('/v1/jengt_provest/admin/ativar/:id', cors(), async(request, response, next) => {
    let admin = request.params.id
    let dadosAdmin = await controllerAluno.setEditarRenovarAdmin(admin)

    response.status(dadosAdmin.status_code)
    response.json(dadosAdmin)
})

// endpoint: editar os dados do admin
app.put('/v1/jengt_provest/admin/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let admin = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAluno.setAtualizarAdmin(dadosBody, contentType, admin)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

// #region CURSO

/****************************** CURSO ****************************/
// endpoints: listar os cursos
app.get('/v1/jengt_provest/cursos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosAlunos = await controllerAluno.getListarAlunos()

    response.status(dadosAlunos.status_code)
    response.json(dadosAlunos)
})

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})