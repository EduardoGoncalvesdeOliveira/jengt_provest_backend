/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de videoaulas
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const videoaulasDAO = require('../model/DAO/videoaulas.js')
const controllerTopicos = require('../controller/controller-topicos.js')
const topicosDAO = require('../model/DAO/topicos.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar uma videoaula pelo ID
const getBuscarVideoaula = async (id) => {
    // recebe o id
    let idVideoaula = id;
    let videoaulasJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idVideoaula == '' || idVideoaula == undefined || isNaN(idVideoaula)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosVideoaula = await videoaulasDAO.selectByIdVideoaula(idVideoaula)

        if (dadosVideoaula) {
            // validação para verificar se existem dados de retorno
            if (dadosVideoaula.length > 0) {
                videoaulasJSON.videoaula = dadosVideoaula
                videoaulasJSON.status_code = 200
                return videoaulasJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar uma videoaula filtrando pelo nome
const getVideoaulaByTopico = async (idTopico) => {
    let videoaulasJSON = {}
    let topico = idTopico

    if (topico == '' || topico == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        
        let dadosTopico = await topicosDAO.selectByIdTopico(topico)
        let dadosVideoaula = await videoaulasDAO.selectVideoaulaByTopico(idTopico)

        if(dadosVideoaula){
            dadosTopico[0].videoaulas = dadosVideoaula
        }

        if (dadosTopico) {
            if (dadosVideoaula.length > 0) {
                videoaulasJSON.videoaulas = dadosTopico
                videoaulasJSON.qt = dadosVideoaula.length
                videoaulasJSON.status_code = 200
                return videoaulasJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// listar todos as videoaulas existentes no DBA
const getListarVideoaulas = async () => {

    let videoaulasJSON = {}
    let topicos = await topicosDAO.selectAllTopicos()

    const promise = topicos.map(async (topico) => {
        const videoaulas = await videoaulasDAO.selectVideoaulaByTopico(topico.id)
        topico.videoaulas = videoaulas
    })

    await Promise.all(promise)

    if (topicos) {
        if (topicos.length > 0) {
            videoaulasJSON.videoaulas = topicos
            videoaulasJSON.qt = topicos.length
            videoaulasJSON.status_code = 200
            return videoaulasJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}


// post: função para inserir uma nova videoaula no DBA
const setNovaVideoaula = async(dadosVideoaula, contentType) => {    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosVideoaula = {}
            let valTopicos = await controllerTopicos.getBuscarTopicos(dadosVideoaula.topico_id)

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosVideoaula.titulo == ''     || dadosVideoaula.titulo == undefined      || dadosVideoaula.titulo.length > 100  ||
                dadosVideoaula.duracao == ''     || dadosVideoaula.duracao == undefined     || dadosVideoaula.duracao.length > 20  ||
                dadosVideoaula.link == ''        || dadosVideoaula.link == undefined        || dadosVideoaula.link.length > 200    ||
                dadosVideoaula.topico_id == ''   || dadosVideoaula.topico_id == undefined   || valTopicos.status == false
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400      
                } else {
                //envia os dados para o DAO inserir no BD
                let novoVideo = await videoaulasDAO.insertVideoaulas(dadosVideoaula)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoVideo) {
                    let id = await videoaulasDAO.selectLastId()
                    dadosVideoaula.id = Number(id[0].id)             
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosVideoaula.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosVideoaula.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosVideoaula.message = message.SUCCESS_CREATED_ITEM.message

                    return resultDadosVideoaula
                } 
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

module.exports = {
    getListarVideoaulas,
    getBuscarVideoaula,
    getVideoaulaByTopico,
    setNovaVideoaula
}