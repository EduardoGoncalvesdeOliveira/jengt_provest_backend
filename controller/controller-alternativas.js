/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de exercicios
* Data: 26/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const alternativasDAO = require('../model/DAO/alternativas.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// listar todos os exercicios existentes no DBA
const getListarAlternativas = async () => {
    let alternativaJSON = {}
    let dadosAlternativas = await alternativasDAO.selectAllAlternativas()

    if (dadosAlternativas) {
        if (dadosAlternativas.length > 0) {
            alternativaJSON.alternativas = dadosAlternativas
            alternativaJSON.qt = dadosAlternativas.length
            alternativaJSON.status_code = 200
            return alternativaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um prof filtrando pelo nome
const getAlternativasByIdQuestao = async (idQuestao) => {
    let alternativaJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idQuestao == '' || idQuestao == undefined || isNaN(idQuestao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAlternativas = await alternativasDAO.selectAlternativasByIdQuestao(idQuestao)

        if (dadosAlternativas) {
            // validação para verificar se existem dados de retorno
            if (dadosAlternativas.length > 0) {
                alternativaJSON.alternativas = dadosAlternativas
                alternativaJSON.status_code = 200
                return alternativaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    getListarAlternativas ,
    getAlternativasByIdQuestao
}