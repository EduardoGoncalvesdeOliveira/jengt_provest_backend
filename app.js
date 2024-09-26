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
const controllerExercicio = require('./controller/controller-exercicios.js')
const controllerCurso = require('./controller/controller-curso.js')
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

// endpoint: validacao de usuario
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/aluno/entrar', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAluno.getValidarAluno(dadosBody, contentType)
    
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

// endpoint: validacao de usuario
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/prof/entrar', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerProf.getValidar(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
    
})
/*************************************************************************/

// #region EXERCICIOS
/****************************** EXERCICIOS ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/exercicios', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosExercicios = await controllerExercicio.getListarExercicios()

    response.status(dadosExercicios.status_code)
    response.json(dadosExercicios)
})

// endpoint: filtrar pelo topico
app.get('/v1/jengt_provest/exercicios/:idTopico', cors(), async(request, response, next) => {
    let idTopico = request.params.idTopico

    // chama a função para retornar os dados do admin
    let dadosExercicio = await controllerExercicio.getExerciciosByTopico(idTopico)

    response.status(dadosExercicio.status_code)
    response.json(dadosExercicio)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/exercicio/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idExercicio = request.params.id

    let dadosExercicio = await controllerExercicio.getBuscarExercicio(idExercicio)

    response.status(dadosExercicio.status_code)
    response.json(dadosExercicio)
})
/*************************************************************************/

// #region CURSOS
/****************************** CURSOS ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/cursos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosCursos = await controllerCurso.getListarCursos()

    response.status(dadosCursos.status_code)
    response.json(dadosCursos)
})

// endpoint: filtrar pelo nome
app.get('/v1/jengt_provest/cursos/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados do admin
    let dadosCurso = await controllerCurso.getCursoByNome(filtro)

    response.status(dadosCurso.status_code)
    response.json(dadosCurso)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/curso/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idCurso = request.params.id

    let dadosCurso = await controllerCurso.getBuscarCurso(idCurso)

    response.status(dadosCurso.status_code)
    response.json(dadosCurso)
})
/*************************************************************************/

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})