// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de Usuarios
// data: 03/09/2024 - inicio
// autor: Eduardo Gonçalves de Oliveira
// versao: 1.0

// import do arquivo DAO para manipular dados do BD
const alunoDAO = require('../model/DAO/alunos.js')
const cursoDAO = require('../model/DAO/cursos.js')
const controllerIcone = require('./controller-icones.js')
const controllerCurso = require('./controller-curso.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo aluno no DBA
const setNovoAluno = async(dadosAluno, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosAlunos = {}
            let valIcone = await controllerIcone.getBuscarIcone(dadosAluno.icone_id)
            let valCurso = await controllerCurso.getBuscarCurso(dadosAluno.curso_id)

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosAluno.nome == ''             || dadosAluno.nome == undefined              || dadosAluno.nome.length > 100         ||
                dadosAluno.email == ''             || dadosAluno.email == undefined             || dadosAluno.email.length > 120        ||
                dadosAluno.senha == ''             || dadosAluno.senha == undefined             || dadosAluno.senha.length > 32         ||
                dadosAluno.icone_id == ''          || dadosAluno.icone_id == undefined          || valIcone.status == false             ||
                dadosAluno.curso_id == ''          || dadosAluno.curso_id == undefined          || valCurso.status == false   
                ){    
                 return message.ERROR_REQUIRED_FIELDS // 400      
            } else {
                //envia os dados para o DAO inserir no BD
                let novoAluno = await alunoDAO.insertAluno(dadosAluno)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoAluno) {
                    let id = await alunoDAO.selectLastId()             
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAlunos.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosAlunos.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosAlunos.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosAlunos.aluno = {
                        id: Number(id[0].id),
                        nome: dadosAluno.nome,
                        email: dadosAluno.email,
                        senha: dadosAluno.senha,
                        curso: valCurso.curso[0],
                        icone: valIcone.icone[0],
                    }
                    return resultDadosAlunos
                } 
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um aluno existente
const setAtualizarAluno = async (dadosAluno, contentType, id) => {
    try {
        let aluno = id
        
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosAluno = {}
            let valIcone = await controllerIcone.getBuscarIcone(dadosAluno.icone_id)
            let valCurso = await controllerCurso.getBuscarCurso(dadosAluno.curso_id)

            if (dadosAluno.nome == ''         || dadosAluno.nome == undefined       || dadosAluno.nome.length > 100   ||
                dadosAluno.email == ''        || dadosAluno.email == undefined      || dadosAluno.email.length > 120  ||
                dadosAluno.icone_id == ''     || dadosAluno.icone_id == undefined   || valIcone.status == false       ||
                dadosAluno.curso_id == ''     || dadosAluno.curso_id == undefined   || valCurso.status == false   
                ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let alunoAtualizado = await alunoDAO.updateAluno(dadosAluno, aluno);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (alunoAtualizado) {
                    dadosAluno.id = aluno

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAluno.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAluno.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAluno.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAluno.aluno = {
                        id: Number(id[0].id),
                        nome: dadosAluno.nome,
                        email: dadosAluno.email,
                        curso: valCurso.curso[0],
                        icone: valIcone.icone[0],
                    }

                    return resultDadosAluno
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um icone existente
const setAtualizarIcone = async (icone, id) => {
    try {        
            // cria a variável JSON
            let resultDadosAluno = {}

            if (
                icone == '' || icone == undefined || icone == false ||
                id == '' || id == undefined || id == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let iconeAtt = await alunoDAO.updateIcone(icone, id);                
console.log(iconeAtt);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (iconeAtt) {

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAluno.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAluno.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAluno.message = message.SUCCESS_UPDATED_ITEM.message

                    return resultDadosAluno
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }

            }

       

    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

//delete/put: função para esconder um aluno existente
const setEditarExcluirAluno = async (id) => {
    try {
        let aluno = id
        let valAluno  = await getBuscarAluno(aluno)
        let resultDadosAluno

        if (aluno == '' || aluno == undefined || isNaN(aluno)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valAluno.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosAluno = await alunoDAO.updateDeleteAluno(aluno)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAluno)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        console.log(error);
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar um aluno existente
const setEditarRenovarAluno = async (id) => {
    try {
        let aluno = id
        let resultDadosAluno

        if (aluno == '' || aluno == undefined || isNaN(aluno)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosAluno = await alunoDAO.updateRecoverAluno(aluno)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAluno)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os alunos existentes no DBA
const getListarAlunos = async () => {
    let alunoJSON = {}
    let dadosAlunos = await alunoDAO.selectAllAlunos()

    if (dadosAlunos) {
        if (dadosAlunos.length > 0) {
            alunoJSON.alunos = dadosAlunos
            alunoJSON.qt = dadosAlunos.length
            alunoJSON.status_code = 200
            return alunoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um aluno pelo ID
const getBuscarAluno = async (id) => {
    // recebe o id
    let idAluno = id;
    let alunoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAluno = await alunoDAO.selectByIdAluno(idAluno)
        if (dadosAluno) {
            // validação para verificar se existem dados de retorno
            if (dadosAluno.length > 0) {
                alunoJSON.aluno = dadosAluno
                alunoJSON.status_code = 200
                return alunoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um aluno filtrando pelo nome
const getAlunoByNome = async (nome) => {
    let alunoJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosAluno = await alunoDAO.selectByNome(filtro)
        if (dadosAluno) {
            if (dadosAluno.length > 0) {
                alunoJSON.aluno = dadosAluno
                alunoJSON.qt = dadosAluno.length
                alunoJSON.status_code = 200

                return alunoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

const setAtualizarAlunoSenha = async(dadosAluno, contentType, idAluno) => {
    try { 
        let aluno = idAluno
        
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosAluno = {}

            if (dadosAluno.senha == ''         || dadosAluno.senha == undefined       || dadosAluno.senha.length > 32){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let senhaAtt = await alunoDAO.updateAlunoSenha(dadosAluno, aluno)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (senhaAtt) {
                    dadosAluno.id = aluno

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAluno.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAluno.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAluno.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAluno.aluno = {
                        id: idAluno,
                        senha: dadosAluno.senha
                    }
                    return resultDadosAluno
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

const getValidarAluno = async(dadosAluno, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){   
            let emailAluno = dadosAluno.email
            let senhaAluno = dadosAluno.senha
            let alunoJSON = {}

            if(emailAluno == ''  || emailAluno == undefined  || 
                senhaAluno == '' || senhaAluno == undefined
            ){
                
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let dadosAluno = await alunoDAO.selectValidacaoAluno(emailAluno, senhaAluno)

                if(dadosAluno){
                    if(dadosAluno.length > 0){         
                        let aluno = dadosAluno

                        alunoJSON.status = message.VALIDATED_ITEM.status       
                        alunoJSON.status_code = message.VALIDATED_ITEM.status_code       
                        alunoJSON.message = message.VALIDATED_ITEM.message       
                        alunoJSON.aluno = aluno
                
                        return alunoJSON
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}


module.exports = {
    getValidarAluno,
    setNovoAluno,
    setAtualizarAlunoSenha,
    setAtualizarAluno,
    setAtualizarIcone,
    setEditarExcluirAluno,
    setEditarRenovarAluno,
    getListarAlunos,
    getBuscarAluno,
    getAlunoByNome
}