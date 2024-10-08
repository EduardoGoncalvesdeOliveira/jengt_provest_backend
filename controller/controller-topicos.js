/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de topicos
* Data: 26/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD

const topicosDAO = require('../model/DAO/topicos.js')
const exercicioDAO = require('../model/DAO/exercicios.js')
const controllerExercicio = require('./controller-exercicios.js')

//const controllerExercicio = require('./controller-exercicios.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// listar todos os topicos existentes no DBA
const getListarTopicos = async () => {
    let topicosJSON = {}
    let dadosTopicos = await topicosDAO.selectAllTopicos()

    if (dadosTopicos) {
        if (dadosTopicos.length > 0) {
            topicosJSON.topicos = dadosTopicos
            topicosJSON.qt = dadosTopicos.length
            topicosJSON.status_code = 200
            return topicosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um topico pelo ID
const getBuscarTopicos = async (id) => {
    // recebe o id
    let idTopico = id;
    let topicosJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idTopico == '' || idTopico == undefined || isNaN(idTopico)) {
        return message.ERROR_INVALID_ID //400
    } else {

        const dadosExercicio = await controllerExercicio.getExerciciosByTopico(id)
        let dadosTopicos = await topicosDAO.selectByIdTopico(idTopico)

        if (dadosTopicos) {
            
            if(dadosExercicio.exercicios.length > 0){
                dadosTopicos[0].exercicios = dadosExercicio.exercicios
            }

            // validação para verificar se existem dados de retorno
            if (dadosTopicos.length > 0) {
                topicosJSON.topico = dadosTopicos[0]
                topicosJSON.status_code = 200
                
                return topicosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    getListarTopicos,
    getBuscarTopicos
}