/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de temas
* Data: 08/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const temasDAO = require('../model/DAO/temas.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar um icone pelo ID
const getBuscarTema = async (id) => {
    // recebe o id
    let idTema = id;
    let temaJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idTema == '' || idTema == undefined || isNaN(idTema)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosTema = await temasDAO.selectByIdTema(idTema)
        if (dadosTema) {
            // validação para verificar se existem dados de retorno
            if (dadosTema.length > 0) {
                temaJSON.temas = dadosTema
                temaJSON.status_code = 200
                return temaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: listar todos os icones
const getListarTemas = async() => {
    let temaJSON = {}
    let dadosTemas = await temasDAO.selectAllTemas()
    
    if (dadosTemas) {
        if (dadosTemas.length > 0) {
            temaJSON.tema = dadosTemas
            temaJSON.qt = dadosTemas.length
            temaJSON.status_code = 200
            return temaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

module.exports={
    getBuscarTema,
    getListarTemas
}