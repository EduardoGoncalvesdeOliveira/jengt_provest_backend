/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de cursos
* Data: 19/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/


// import do arquivo DAO para manipular dados do BD
const cursoDAO = require('../model/DAO/cursos.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para listar todos os cursos existentes no DBA
const getListarCursos = async () => {
    let cursoJSON = {}
    let dadosCurso = await cursoDAO.selectAllCursos()

    if (dadosCurso) {
        if (dadosCurso.length > 0) {
         cursoJSON.curso = dadosCurso
         cursoJSON.qt = dadosCurso.length
         cursoJSON.status_code = 200
            return cursoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um curso pelo ID
const getBuscarCurso = async (id) => {
    // recebe o id
    let idCurso = id;
    let cursoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosCurso = await cursoDAO.selectByIdCurso(idCurso)
        if (dadosCurso) {
            // validação para verificar se existem dados de retorno
            if (dadosCurso.length > 0) {
                cursoJSON.curso = dadosCurso
                cursoJSON.status_code = 200
                return cursoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um curso filtrando pelo nome
const getCursoByNome = async (nome) => {
    let cursoJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosCurso = await cursoDAO.selectByNome(filtro)
        if (dadosCurso) {
            if (dadosCurso.length > 0) {
                cursoJSON.curso = dadosCurso
                cursoJSON.qt = dadosCurso.length
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
    getListarCursos,
    getBuscarCurso,
    getCursoByNome
}