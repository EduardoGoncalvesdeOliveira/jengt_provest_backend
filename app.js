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
const controllerAluno = require('./controller/controller_alunos.js')
const controllerProf = require('./controller/controller-prof.js')
/*********************************************************************************/


// #region ALUNO
/****************************** ALUNO ****************************/
// endpoints: listar os alunos
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

// endpoint: retorna os dados do aluno, filtrando pelo ID
app.get('/v1/jengt_provest/aluno/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getBuscarAluno(idAluno)

    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

// endpoint: inserir novos alunos no Banco de Dados
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

// endpoint: editar o status do aluno para false para "exclui-lo"
app.put('/v1/jengt_provest/aluno/excluir/:id', cors(), async(request, response, next) => {
    let aluno = request.params.id
    let dadosAluno = await controllerAluno.setEditarExcluirAluno(aluno)

    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

// endpoint: editar o status do aluno para true para acha-lo
app.put('/v1/jengt_provest/aluno/ativar/:id', cors(), async(request, response, next) => {
    let aluno = request.params.id
    let dadosAluno = await controllerAluno.setEditarRenovarAluno(aluno)

    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

// endpoint: editar os dados do aluno
app.put('/v1/jengt_provest/aluno/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let aluno = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAluno.setAtualizarAluno(dadosBody, contentType, aluno)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// endpoint: editar a senha do aluno
app.put('/v1/jengt_provest/aluno/senha/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let aluno = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAluno.setAtualizarAlunoSenha(dadosBody, contentType, aluno)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

// #region PROF
/****************************** PROF ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/profs', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosProfs = await controllerProf.getListarProfessores()

    response.status(dadosProfs.status_code)
    response.json(dadosProfs)
})

// endpoint: filtrar pelo nome
app.get('/v1/jengt_provest/profs/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados do admin
    let dadosProfs = await controllerProf.getProfessorByNome(filtro)

    response.status(dadosProfs.status_code)
    response.json(dadosProfs)
})

// endpoint: retorna os dados do aluno, filtrando pelo ID
app.get('/v1/jengt_provest/prof/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idProf = request.params.id

    let dadosProf = await controllerProf.getBuscarProfessor(idProf)

    response.status(dadosProf.status_code)
    response.json(dadosProf)
})

// endpoint: inserir novos alunos no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/prof', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
        
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
        
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerProf.setNovoProfessor(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        
        response.json(resultDados)
    
})

// endpoint: editar o status do aluno para false para "exclui-lo"
app.put('/v1/jengt_provest/prof/excluir/:id', cors(), async(request, response, next) => {
    let prof = request.params.id
    let dadosProf = await controllerProf.setEditarExcluirProf(prof)

    response.status(dadosProf.status_code)
    response.json(dadosProf)
})

// endpoint: editar o status do aluno para true para acha-lo
app.put('/v1/jengt_provest/prof/ativar/:id', cors(), async(request, response, next) => {
    let prof = request.params.id
    let dadosProf = await controllerProf.setEditarAtivarProf(prof)

    response.status(dadosProf.status_code)
    response.json(dadosProf)
})

// endpoint: editar os dados do aluno
app.put('/v1/jengt_provest/prof/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let prof = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerProf.setAtualizarProfessor(dadosBody, contentType, prof)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// endpoint: editar a senha do aluno
app.put('/v1/jengt_provest/prof/senha/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let prof = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerProf.setAtualizarProfSenha(dadosBody, contentType, prof)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})