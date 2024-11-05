/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de fases dos vestibulares
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const fasesDAO = require('../model/DAO/fases.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar a fase pelo ID
const getBuscarFase = async (id) => {
    // recebe o id
    let idFase = id;
    let fasesJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idFase == '' || idFase == undefined || isNaN(idFase)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosFase = await fasesDAO.selectByIdFase(idFase)

        if (dadosFase) {
            // validação para verificar se existem dados de retorno
            if (dadosFase.length > 0) {
                fasesJSON.fase = dadosFase
                fasesJSON.status_code = 200
                return fasesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: listar todos as fases
const getListarFases = async() => {
    let fasesJSON = {}
    let dadosFase = await fasesDAO.selectAllFases()

    if (dadosFase) {
        if (dadosFase.length > 0) {
            fasesJSON.fases = dadosFase
            fasesJSON.qt = dadosFase.length
            fasesJSON.status_code = 200
            return fasesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

module.exports={
    getBuscarFase,
    getListarFases
}