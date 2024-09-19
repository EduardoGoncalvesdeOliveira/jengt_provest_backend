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

// post: função para inserir um novo curso no DBA
const setNovoCurso = async(dadosCurso, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosCursos = {}

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 200){    
                 return message.ERROR_REQUIRED_FIELDS // 400      
            } else {
                //envia os dados para o DAO inserir no BD
                let novoCurso = await cursoDAO.insertCurso(dadosCurso)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoCurso) {
                    
                    let id = await cursoDAO.selectLastId()
                    
                    dadosCurso.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosCursos.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosCursos.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosCursos.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosCursos.curso = dadosCurso
                    return resultDadosCursos
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um curso existente
const setAtualizarCurso = async (dadosCurso, contentType, id) => {
    try {
        let curso = id     
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosCurso = {}

            if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 200){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let cursoAtt = await cursoDAO.updateCurso(dadosCurso, aluno)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (cursoAtt) {
                    dadosCurso.id = aluno

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosCurso.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosCurso.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosCurso.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosCurso.curso = dadosCurso

                    return resultDadosCurso
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
console.log(error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

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
                console.log(dadosCurso);
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
    setNovoCurso,
    setAtualizarCurso,
    getListarCursos,
    getBuscarCurso,
    getCursoByNome
}