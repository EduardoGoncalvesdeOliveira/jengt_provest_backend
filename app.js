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
const axios = require('axios');

// criando objeto app
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', '*')
    app.use(cors())
    // app.use(express.json());
    next()
})

const corsOptions = {
    origin: '*'
};

// cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

//#region IMPORT GOOGLE IA
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

// #region IMPORTS
/****************************** IMPORT DE CONTROLLERS ****************************/
const controllerAluno = require('./controller/controller_alunos.js')
const controllerProf = require('./controller/controller-prof.js')
const controllerExercicio = require('./controller/controller-exercicios.js')
const controllerCurso = require('./controller/controller-curso.js')
const controllerTopicos = require('./controller/controller-topicos.js')
const controllerIcones = require('./controller/controller-icones.js')
const controllerNot = require('./controller/controller-notif.js')
const controllerTemas = require('./controller/controller-temas.js')
const controllerRedacoes = require('./controller/controller-redacoes.js')
const controllerCaderno = require('./controller/controller-caderno.js')
const message = require('./modulo/config.js')
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

// endpoint: editar icone
app.put('/v1/jengt_provest/aluno/icone/', cors(), async(request, response, next) => {
    let aluno = request.query.aluno
    let icone = request.query.icone
    let dadosAluno = await controllerAluno.setAtualizarIcone(icone, aluno)

    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
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

// endpoints: listar professores pela disciplina
app.get('/v1/jengt_provest/profs/disciplina', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosProfs = await controllerProf.getProfByDisc()

    response.status(dadosProfs.status_code)
    response.json(dadosProfs)
})

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

// endpoint: editar icone
app.put('/v1/jengt_provest/icone/prof/', cors(), async(request, response, next) => {

    let icone = request.query.icone
    let prof = request.query.prof
    let dadosProf = await controllerProf.setAtualizarIcone(icone, prof)

    response.status(dadosProf.status_code)
    response.json(dadosProf)
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

// #region ICONES
/****************************** ICONES ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/icones', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosIcones = await controllerIcones.getListarIcones()

    response.status(dadosIcones.status_code)
    response.json(dadosIcones
    )
})
/*************************************************************************/

// #region CURSOS
/****************************** CURSOS ****************************/

// endpoint: inserir curso
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/curso/', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerCurso.setNovoCurso(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
    
})

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

// endpoints: listar todos as disciplinas para seus cursos
app.get('/v1/jengt_provest/cursos/disciplinas', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosCursos = await controllerCurso.getListarCursosDisciplinas()

    response.status(dadosCursos.status_code)
    response.json(dadosCursos)
})

// endpoint: retorna os dados, filtrando pelo ID do curso
app.get('/v1/jengt_provest/curso/disciplinas/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idCurso = request.params.id

    let dadosCurso = await controllerCurso.getDisciplinaByCurso(idCurso)

    response.status(dadosCurso.status_code)
    response.json(dadosCurso)
})

// endpoints: listar professores pela disciplina
app.get('/v1/jengt_provest/profs/disciplina/:idDisciplina', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idDisciplina = request.params.idDisciplina

    let dadosProf = await controllerProf.getProfByDisc(idDisciplina)

    response.status(dadosProf.status_code)
    response.json(dadosProf)
})
/*************************************************************************/

// #region TÓPICOS
/****************************** TÓPICOS ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/topicos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosTopicos = await controllerTopicos.getListarTopicos()

    response.status(dadosTopicos.status_code)
    response.json(dadosTopicos)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/topico/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idTopico = request.params.id

    let dadosTopico = await controllerTopicos.getBuscarTopicos(idTopico)

    response.status(dadosTopico.status_code)
    response.json(dadosTopico)
})
/*************************************************************************/

// #region NOTIFICAÇÕES
/****************************** NOTIFICAÇÕES ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/notificacoes', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosNot = await controllerNot.getListarNotif()

    response.status(dadosNot.status_code)
    response.json(dadosNot)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/notificacao/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idNotif = request.params.id

    let dadosNot = await controllerNot.getBuscarNotif(idNotif)

    response.status(dadosNot.status_code)
    response.json(dadosNot)
})

// endpoint: retorna os dados, filtrando pelo vestibular
app.get('/v1/jengt_provest/notificacoes/filtro/:vest', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let filtro = request.params.vest

    let dadosNot = await controllerNot.getBuscarNotifByVestibular(filtro)

    response.status(dadosNot.status_code)
    response.json(dadosNot)
})
/*************************************************************************/

// #region TEMAS - REDAÇÃO
/****************************** TEMAS - REDAÇÃO ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/temas', cors(), async(request, response, next) => {
    // chama a função para retornar os dados
    let dadosTemas = await controllerTemas.getListarTemas()

    response.status(dadosTemas.status_code)
    response.json(dadosTemas)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/tema/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idTema = request.params.id

    let dadosTema = await controllerTemas.getBuscarTema(idTema)

    response.status(dadosTema.status_code)
    response.json(dadosTema)
})

    //#region REDACOES
// endpoints: listar os alunos
app.get('/v1/jengt_provest/redacoes', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosRedacao = await controllerRedacoes.getListarRedacoes()

    response.status(dadosRedacao.status_code)
    response.json(dadosRedacao)
})

// endpoint: filtrar pelo nome
app.get('/v1/jengt_provest/redacao/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.titulo

    // chama a função para retornar os dados do admin
    let dadosRedacao = await controllerRedacoes.getRedacaoByTitulo(filtro)

    response.status(dadosRedacao.status_code)
    response.json(dadosRedacao)
})

// endpoint: retorna os dados do aluno, filtrando pelo ID
app.get('/v1/jengt_provest/redacao/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idRedacao = request.params.id

    let dadosRedacao = await controllerRedacoes.getBuscarRedacao(idRedacao)

    response.status(dadosRedacao.status_code)
    response.json(dadosRedacao)
})

// endpoint: inserir novos alunos no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/redacao', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']

        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerRedacoes.setNovaRedacao(dadosBody, contentType)
        //console.log(resultDados);
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar os dados do aluno
app.put('/v1/jengt_provest/redacao/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let redacao = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerRedacoes.setAtualizarRedacao(dadosBody, contentType, redacao)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

//#region correção
app.post('/v1/jengt_provest/correcao/redacao', cors(), bodyParserJSON, async(request, response, next) => {
  
    const redacao = request.body
  
    const dadosBody = JSON.stringify({redacao})

    console.log(dadosBody);

  if (!dadosBody) {
    return message.ERROR_INVALID_TEXT // 400
  }

  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
  const apiKey = "AIzaSyDUCeGhCXD2bNQ_Y_07j4Wd6QFUXMvWX4U";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "A partir das competências, corrija as redações e atribua notas para cada competência e uma explicação da nota, gerando a nota total com dicas para melhorias",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  }
  
const run = async() => {
    const chatSession = model.startChat({
          generationConfig
    })

    const redacao = dadosBody
  
    const result = await chatSession.sendMessage(redacao);

    response.json(result)

    console.log(result.response.text());
  }
  
  run()
})
/*************************************************************************/

// #region CADERNO
/****************************** CADERNO ****************************/
// endpoints: listar tudo
app.get('/v1/jengt_provest/caderno', cors(), async(request, response, next) => {
  // chama a função para retornar os dados
  let dadosAnot = await controllerCaderno.getListarAnotacoes()

  response.status(dadosAnot.status_code)
  response.json(dadosAnot)
})

// endpoint: retorna os dados, filtrando pelo ID
app.get('/v1/jengt_provest/caderno/:id', cors(), async(request, response, next) => {
  // recebe o id da requisição do admin
  let idAnotacao = request.params.id

  let dadosAnot = await controllerCaderno.getBuscarAnotacao(idAnotacao)

  response.status(dadosAnot.status_code)
  response.json(dadosAnot)
})

// endpoint: retorna os dados, filtrando pelo titulo
app.get('/v1/jengt_provest/caderno/filtro/:titulo', cors(), async(request, response, next) => {
  // recebe o id da requisição do admin
  let filtro = request.params.titulo

  let dadosAnot = await controllerCaderno.getAnotByTitulo(filtro)

  response.status(dadosAnot.status_code)
  response.json(dadosAnot)
})

// endpoint: inserir novas anotações no Banco de Dados
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/jengt_provest/caderno', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']

        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body

        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerCaderno.setNovaAnotacao(dadosBody, contentType)

        response.status(resultDados.status_code)
        response.json(resultDados)
})

// endpoint: editar os dados da anotação
app.put('/v1/jengt_provest/caderno/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let anotacao = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerCaderno.setAtualizarAnotacao(dadosBody, contentType, anotacao)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})