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
    let dadosCursorso = await cursoDAO.selectAllCursos()

    if (dadosCursorso) {
        if (dadosCursorso.length > 0) {
            cursoJSON.curso = dadosCursorso
            cursoJSON.qt = dadosCursorso.length
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
        let dadosCursorso = await cursoDAO.selectByIdCurso(idCurso)
        if (dadosCursorso) {
            // validação para verificar se existem dados de retorno
            if (dadosCursorso.length > 0) {
                cursoJSON.curso = dadosCursorso
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

        let dadosCursorso = await cursoDAO.selectByNome(filtro)
        if (dadosCursorso) {
            if (dadosCursorso.length > 0) {
                cursoJSON.curso = dadosCursorso
                cursoJSON.qt = dadosCursorso.length
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

const setNovoCurso = async (dadosCurso, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosCurso = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400      
            } else {

                
                
                // if (dadosCurso.disciplinas) {
                //     dadosCurso.disciplinas.forEach((disc) => {
                //         let validacaoDisc = controller.getDiscById(disc)
                //         if (!validacaoDisc) {
                //             return message.ERROR_INVALID_PARAM
                //         }
                //     })
                // }
                console.log('bustiquinha veia');

                //envia os dados para o DAO inserir no BD
                let cuso = await cursoDAO.insertCurso(dadosCurso)
                console.log('OIA AQUI O CUSO' + cuso);
                

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (cuso) {

                    let id = await cursoDAO.selectLastId()                    

                    dadosCurso.disciplinas.forEach(async (cusinho) => {
                        await cursoDAO.insertDisciplinaCurso(id[0].id, cusinho)
                    })
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosCurso.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosCurso.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosCurso.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosCurso.cuso = dadosCurso
                    return resultDadosCurso
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os cursos e disciplinas existentes no DBA
const getListarCursosDisciplinas = async () => {
    let cursoDiscJSON = {}
    let dadosCursoDisc = await cursoDAO.selectAllCursos()
    
    if (dadosCursoDisc) {
        if (dadosCursoDisc.length > 0) {

            let cuzinho = []
            const promise = dadosCursoDisc.map(async (curso) => {
                cuzinho.push(await getDisciplinaByCurso(curso.id))      
            })

            await Promise.all(promise)
            
            cursoDiscJSON.curso_disciplina = cuzinho
            cursoDiscJSON.qt = cuzinho.length
            cursoDiscJSON.status_code = 200
            return cursoDiscJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um curso filtrando pelo nome
const getDisciplinaByCurso = async (id) => {

    let idCurso = id
    let cursoDiscJSON = {}
    const dadosCurso = await cursoDAO.selectByIdCurso(idCurso)    
    
    if (idCurso == '' || idCurso == undefined || dadosCurso.length <= 0) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        const disciplinasCurso = await cursoDAO.selectDiscByCurso(idCurso)    
        
        if (disciplinasCurso) {
            
            if (disciplinasCurso.length > 0) {
                
                // usando o mapi...
                // o map retorna um array, nesse caso, o array está indo para o disciplinas
                // o disciplinasCurso é o array que estamos percorrendo
                // cada item do array, estamos chamando de disciplinas
                // como ele retorna um array, precisamos retornar algum valor pra preencher esse array
                // ali a gente está retornando o atributo disciplina do objeto disciplina (item que está dentro do array)
                let disciplinas = disciplinasCurso.map((disciplina) => {
                    return disciplina.disciplina
                })        
                
                cursoDiscJSON.id = idCurso
                cursoDiscJSON.curso = disciplinasCurso[0].curso
                cursoDiscJSON.disciplinas = disciplinas
                cursoDiscJSON.qt = disciplinasCurso.length
                cursoDiscJSON.status_code = 200

                return cursoDiscJSON
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
    getListarCursos,
    getBuscarCurso,
    getCursoByNome,
    getListarCursosDisciplinas,
    getDisciplinaByCurso
}