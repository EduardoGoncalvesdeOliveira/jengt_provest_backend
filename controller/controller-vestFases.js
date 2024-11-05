/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de vestibulares e fases
* Data: 05/11/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/


// import do arquivo DAO para manipular dados do BD
const vestFasesDAO = require('../model/DAO/vest-fases.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para listar todos os vest e fases existentes no DBA
const getListarVestFases = async () => {
    let vestFasesJSON = {}
    let dadosVestFase = await vestFasesDAO.selectAllVestFases()

    if (dadosVestFase) {
        if (dadosVestFase.length > 0) {
            vestFasesJSON.vest_fases = dadosVestFase
            vestFasesJSON.qt = dadosVestFase.length
            vestFasesJSON.status_code = 200
            return vestFasesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um vest e fase pelo ID
const getBuscarVestFases = async (id) => {
    // recebe o id
    let idVestFase = id;
    let vestFasesJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idVestFase == '' || idVestFase == undefined || isNaN(idVestFase)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosVestFase = await vestFasesDAO.selectByIdVestFase(idVestFase)
        if (dadosVestFase) {
            // validação para verificar se existem dados de retorno
            if (dadosVestFase.length > 0) {
                vestFasesJSON.vest_fase = dadosVestFase
                vestFasesJSON.status_code = 200
                return vestFasesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um vest e fase filtrando pela instituicao
const getVestFaseByInstituicao = async (instituicao, data) => {
    let vestFasesJSON = {}
    let filtro = instituicao
    let filtroData = data

    if ((filtro == '' || filtro == undefined) && (filtroData == '' || filtroData == undefined)) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        
        let dadosVestFase 

        if(filtro)
            dadosVestFase = await vestFasesDAO.selectByInstituicao(filtro)
        else if(filtroData)
            dadosVestFase = await vestFasesDAO.selectByDataVest(filtroData)
        
        
        if (dadosVestFase) {
            if (dadosVestFase.length > 0) {
                vestFasesJSON.vest_fase = dadosVestFase
                vestFasesJSON.qt = dadosVestFase.length
                vestFasesJSON.status_code = 200

                return vestFasesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar um vest e fase filtrando pela instituicao
const getVestFaseByData = async (instituicao) => {
    let vestFasesJSON = {}
    let filtro = instituicao

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosVestFase = await vestFasesDAO.selectByInstituicao(filtro)
        if (dadosVestFase) {
            if (dadosVestFase.length > 0) {
                vestFasesJSON.vest_fase = dadosVestFase
                vestFasesJSON.qt = dadosVestFase.length
                vestFasesJSON.status_code = 200

                return vestFasesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    getListarVestFases,
    getBuscarVestFases,
    getVestFaseByInstituicao
}