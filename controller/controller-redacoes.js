/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de redacoes
* Data: 10/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/


// import do arquivo DAO para manipular dados do BD
const redacaoDAO = require('../model/DAO/redacoes.js')
const controllerTemas =  require('./controller-temas.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo aluno no DBA
const setNovaRedacao = async(dadosRedacao, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosRedacao = {}
            let valTema = await controllerTemas.getBuscarTema(dadosRedacao.tema_id)

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosRedacao.titulo == ''     || dadosRedacao.titulo == undefined       || dadosRedacao.titulo.length > 100  ||
                dadosRedacao.texto == ''       || dadosRedacao.texto == undefined        || dadosRedacao.texto.length > 5000  ||
                dadosRedacao.tema_id == ''     || dadosRedacao.tema_id == undefined      || valTema.status == false   
                ){    
                 return message.ERROR_REQUIRED_FIELDS // 400      
                } else {
                    //envia os dados para o DAO inserir no BD
                let novaRedacao = await redacaoDAO.insertRedacoes(dadosRedacao)
                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novaRedacao) {
                    let id = await redacaoDAO.selectLastId()             
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosRedacao.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosRedacao.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosRedacao.message = message.SUCCESS_CREATED_ITEM.message

                    return resultDadosRedacao
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
const setAtualizarRedacao = async (dadosRedacao, contentType, id) => {
    try {
        let redacao = id
        
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosRedacao = {}
            let valTema = await controllerTemas.getBuscarTema(dadosRedacao.tema_id)

            if (dadosRedacao.titulo == ''    || dadosRedacao.titulo == undefined     || dadosRedacao.titulo.length > 100   ||
                dadosRedacao.texto == ''     || dadosRedacao.texto == undefined      || dadosRedacao.texto.length > 5000    ||
                dadosRedacao.tema_id == ''   || dadosRedacao.tema_id == undefined    || valTema.status == false   
                ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let redacaoAtt = await redacaoDAO.updateRedacao(dadosRedacao, redacao);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (redacaoAtt) {
                    dadosRedacao.id = redacao

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosRedacao.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosRedacao.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosRedacao.message = message.SUCCESS_UPDATED_ITEM.message

                    return resultDadosRedacao
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
const getListarRedacoes = async () => {
    let redacaoJSON = {}
    let dadosRedacao = await redacaoDAO.selectAllRedacoes()

    if (dadosRedacao) {
        if (dadosRedacao.length > 0) {
            redacaoJSON.redacoes = dadosRedacao
            redacaoJSON.qt = dadosRedacao.length
            redacaoJSON.status_code = 200
            return redacaoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um aluno pelo ID
const getBuscarRedacao = async (id) => {
    // recebe o id
    let idRedacao = id;
    let redacaoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idRedacao == '' || idRedacao == undefined || isNaN(idRedacao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosRedacao = await redacaoDAO.selectByIdRedacao(idRedacao)
        if (dadosRedacao) {
            // validação para verificar se existem dados de retorno
            if (dadosRedacao.length > 0) {
                redacaoJSON.redacao = dadosRedacao
                redacaoJSON.status_code = 200
                return redacaoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um aluno filtrando pelo nome
const getRedacaoByTitulo = async (nome) => {
    let redacaoJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosRedacao = await redacaoDAO.selectByTitulo(filtro)
        if (dadosRedacao) {
            if (dadosRedacao.length > 0) {
                redacaoJSON.aluno = dadosRedacao
                redacaoJSON.qt = dadosRedacao.length
                redacaoJSON.status_code = 200

                return redacaoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar redações do aluno especificado pelo ID
const getBuscarRedacaoByAlunoId = async (id) => {
    // recebe o id
    let idAluno = id;
    let redacaoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosRedacao = await redacaoDAO.selectByAlunoIdRedacao(idAluno)
        if (dadosRedacao) {
            // validação para verificar se existem dados de retorno
            if (dadosRedacao.length > 0) {
                redacaoJSON.redacao = dadosRedacao
                redacaoJSON.status_code = 200
                return redacaoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    setNovaRedacao,
    setAtualizarRedacao,
    getListarRedacoes,
    getBuscarRedacao,
    getRedacaoByTitulo,
    getBuscarRedacaoByAlunoId
}