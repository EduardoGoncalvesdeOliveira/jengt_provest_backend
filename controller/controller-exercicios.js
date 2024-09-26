/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de exercicios
* Data: 26/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const exercicioDAO = require('../model/DAO/exercicios.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// listar todos os exercicios existentes no DBA
const getListarExercicios = async () => {
    let exerciciosJSON = {}
    let dadosExercicios = await exercicioDAO.selectAllExercicios()

    if (dadosExercicios) {
        if (dadosExercicios.length > 0) {
            //     const promise = dadosExercicios.map(async (prof) => {
            //         if (disciplinas) {
            //             let discArray = []
            //             disciplinas.forEach((disc) => {
            //                 discArray.push(disc.nome)
            //             });
            //             prof.disciplinas = discArray
            //         }

            //     })

            //    await Promise.all(promise)

            exerciciosJSON.exercicios = dadosExercicios
            exerciciosJSON.qt = dadosExercicios.length
            exerciciosJSON.status_code = 200
            return exerciciosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um exercicio pelo ID
const getBuscarExercicio = async (id) => {
    // recebe o id
    let idExercicio = id;
    let exerciciosJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idExercicio == '' || idExercicio == undefined || isNaN(idExercicio)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosExercicios = await exercicioDAO.selectByIdExercicio(idExercicio)
        let alternativas = await exercicioDAO.selectAlternativasByIdQuestao(idExercicio)

        if (dadosExercicios && alternativas) {
            // validação para verificar se existem dados de retorno
            if (dadosExercicios.length > 0 && alternativas.length > 0) {
                dadosExercicios[0].alternativas = alternativas
                exerciciosJSON.exercicio = dadosExercicios
                exerciciosJSON.status_code = 200
                return exerciciosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um prof filtrando pelo nome
const getExerciciosByTopico = async (idTopico) => {
    let exerciciosJSON = {}
    let topico = idTopico

    if (topico == '' || topico == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosExercicio = await exercicioDAO.selectByTopico(topico)
        if (dadosExercicio) {
            if (dadosExercicio.length > 0) {
                const promise = dadosExercicio.map(async (exercicio) => {
                    const alternativas = await exercicioDAO.selectAlternativasByIdQuestao(exercicio.id)                    
                    if (alternativas) {                        
                        exercicio.alternativas = alternativas
                    }
                })
    
                await Promise.all(promise)
                exerciciosJSON.exercicios = dadosExercicio
                exerciciosJSON.qt = dadosExercicio.length
                exerciciosJSON.status_code = 200
                return exerciciosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar um prof filtrando pelo nome
const getAlternativasByIdQuestao = async (idQuestao) => {
    let exerciciosJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idQuestao == '' || idQuestao == undefined || isNaN(idQuestao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosExercicios = await exercicioDAO.selectAlternativasByIdQuestao(idQuestao)

        if (dadosExercicios) {
            // validação para verificar se existem dados de retorno
            if (dadosExercicios.length > 0) {
                // const promise = dadosExercicios.map(async (prof) => {
                //     const disciplinas = await exercicioDAO.selectDisciplinasByProfId(prof.id)
                //     if (disciplinas) {
                //         let discArray = []
                //         disciplinas.forEach((disc) => {
                //             discArray.push(disc.nome)
                //         });
                //         prof.disciplinas = discArray
                //     }

                // })

                // await Promise.all(promise)
                exerciciosJSON.usuario = dadosExercicios
                exerciciosJSON.status_code = 200
                return exerciciosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    getListarExercicios,
    getBuscarExercicio,
    getExerciciosByTopico,
}