/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de ícones
* Data: 17/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const iconeDAO = require('../model/DAO/icones.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar um icone pelo ID
const getBuscarIcone = async (id) => {
    // recebe o id
    let idIcone = id;
    let iconeJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idIcone == '' || idIcone == undefined || isNaN(idIcone)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosIcone = await iconeDAO.selectByIdIcone(idIcone)

        if (dadosIcone) {
            // validação para verificar se existem dados de retorno
            if (dadosIcone.length > 0) {
                iconeJSON.icone = dadosIcone
                iconeJSON.status_code = 200
                return iconeJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

console.log(getBuscarIcone(1));

module.exports={
    getBuscarIcone
}