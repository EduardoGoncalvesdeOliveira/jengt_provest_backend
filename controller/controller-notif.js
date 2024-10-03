/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de notificacoes
* Data: 03/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const notifDAO = require('../model/DAO/notificacoes.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar uma notif pelo ID
const getBuscarNotif = async (id) => {
    // recebe o id
    let idNotif = id;
    let notifJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idNotif == '' || idNotif == undefined || isNaN(idNotif)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosNotif = await notifDAO.selectById(idNotif)

        if (dadosNotif) {
            // validação para verificar se existem dados de retorno
            if (dadosNotif.length > 0) {
                notifJSON.notificacao = dadosNotif
                notifJSON.status_code = 200
                return notifJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: listar todos os not
const getListarNotif = async() => {
    let notifJSON = {}
    let dadosNotif = await notifDAO.selectAllNotificacoes()

    if (dadosNotif) {
        if (dadosNotif.length > 0) {
            notifJSON.notificacoes = dadosNotif
            notifJSON.qt = dadosNotif.length
            notifJSON.status_code = 200
            return notifJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

module.exports={
    getBuscarNotif,
    getListarNotif
}