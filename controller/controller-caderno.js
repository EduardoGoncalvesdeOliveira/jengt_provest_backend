/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de caderno do aluno
* Data: 29/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/


// import do arquivo DAO para manipular dados do BD
const cadernoDAO = require('../model/DAO/caderno.js')
const controllerAluno =  require('./controller_alunos.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo aluno no DBA
const setNovaAnotacao = async(dadosAnot, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosAnot = {}
            let valAluno = await controllerAluno.getBuscarAluno(dadosAnot.aluno_id)

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosAnot.titulo == ''     || dadosAnot.titulo == undefined       || dadosAnot.titulo.length > 100  ||
                dadosAnot.texto == ''       || dadosAnot.texto == undefined        || dadosAnot.texto.length > 5000  ||
                dadosAnot.aluno_id == ''    || dadosAnot.aluno_id == undefined    || valAluno.status == false   
                ){    
                 return message.ERROR_REQUIRED_FIELDS // 400      
                } else {
                //envia os dados para o DAO inserir no BD
                let novaAnotacao = await cadernoDAO.insertAnotacao(dadosAnot)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novaAnotacao) {
                    let id = await cadernoDAO.selectLastId()             
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAnot.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosAnot.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosAnot.message = message.SUCCESS_CREATED_ITEM.message

                    return resultDadosAnot
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
const setAtualizarAnotacao = async (dadosAnot, contentType, id) => {
    try {
        let anotacao = id
        
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosAnot = {}
            let valAluno = await controllerAluno.getBuscarAluno(dadosAnot.aluno_id)

            if (dadosAnot.titulo == ''    || dadosAnot.titulo == undefined     || dadosAnot.titulo.length > 100   ||
                dadosAnot.texto == ''     || dadosAnot.texto == undefined      || dadosAnot.texto.length > 5000    ||
                dadosAnot.aluno_id == ''  || dadosAnot.aluno_id == undefined   || valAluno.status == false   
                ){
                    ret
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let anotacaoAtt = await cadernoDAO.updateAnotacao(dadosAnot, anotacao);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (anotacaoAtt) {
                    dadosAnot.id = anotacao

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAnot.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAnot.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAnot.message = message.SUCCESS_UPDATED_ITEM.message

                    return resultDadosAnot
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

// get: função para listar todos os alunos existentes no DBA
const getListarAnotacoes = async () => {
    let cadernoJSON = {}
    let dadosAnot = await cadernoDAO.selectAllAnotacoes()

    if (dadosAnot) {
        if (dadosAnot.length > 0) {
            cadernoJSON.anotacoes = dadosAnot
            cadernoJSON.qt = dadosAnot.length
            cadernoJSON.status_code = 200
            return cadernoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um aluno pelo ID
const getBuscarAnotacao = async (id) => {
    // recebe o id
    let idAnotacao = id;
    let cadernoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAnotacao == '' || idAnotacao == undefined || isNaN(idAnotacao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAnot = await cadernoDAO.selectByIdAnot(idAnotacao)
        if (dadosAnot) {
            // validação para verificar se existem dados de retorno
            if (dadosAnot.length > 0) {
                cadernoJSON.redacao = dadosAnot
                cadernoJSON.status_code = 200
                return cadernoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um aluno filtrando pelo nome
const getAnotByTitulo = async (nome) => {
    let cadernoJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosAnot = await cadernoDAO.selectByTitulo(filtro)
        if (dadosAnot) {
            if (dadosAnot.length > 0) {
                cadernoJSON.anotacao = dadosAnot
                cadernoJSON.qt = dadosAnot.length
                cadernoJSON.status_code = 200

                return cadernoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovaAnotacao,
    setAtualizarAnotacao,
    getListarAnotacoes,
    getBuscarAnotacao,
    getAnotByTitulo
}