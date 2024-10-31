/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de instituicoes
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const instituicaoDAO = require('../model/DAO/instituicoes.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// listar todos as instituicoes existentes no DBA
const getListarInstituicoes = async () => {
    let instituicoesJSON = {}
    let dadosInst = await instituicaoDAO.selectAllInstituicoes()

    if (dadosInst) {
        if (dadosInst.length > 0) {
            instituicoesJSON.instituicoes = dadosInst
            instituicoesJSON.qt = dadosInst.length
            instituicoesJSON.status_code = 200
            return instituicoesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar uma instituicao pelo ID
const getBuscarInstituicao = async (id) => {
    // recebe o id
    let idInst = id;
    let instituicoesJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idInst == '' || idInst == undefined || isNaN(idInst)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosInst = await instituicaoDAO.selectByIdInstituicao(idInst)
        if (dadosInst) {
            // validação para verificar se existem dados de retorno
            if (dadosInst.length > 0) {
                instituicoesJSON.instituicao = dadosInst
                instituicoesJSON.status_code = 200
                return instituicoesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar instituicao filtrando pela sigla
const getInstituicaoBySigla = async (sigla) => {
    let cursoJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosCursorso = await cursoDAO.selectByNome(filtro)
        if (dadosCursorso) {
            if (dadosCursorso.length > 0) {
                cursoJSON.curso = dadosCursorso
                cursoJSON.qt = dadosCursorso.length
                cursoJSON.status_code = 200

                return cursoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}


module.exports = {
    getListarExercicios,
    getBuscarExercicio,
    getExerciciosByTopico
}