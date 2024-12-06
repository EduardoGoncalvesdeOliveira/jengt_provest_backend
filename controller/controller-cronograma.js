/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de cronograma
* Data: 05/12/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const cronogramaDAO = require('../model/DAO/cronograma.js')
const alunoDAO = require('../model/DAO/alunos.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// get: função para buscar cronograma do aluno especificado pelo ID
const getBuscarCronogramaByAlunoId = async (id) => {
    // recebe o id
    let idAluno = id;
    let cronogramaJSON = {}
    const dadosAluno = await alunoDAO.selectByIdAluno(idAluno)
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosCronograma = await cronogramaDAO.selectDiasSemana(idAluno)
        if (dadosCronograma) {

            // validação para verificar se existem dados de retorno
            if (dadosCronograma.length > 0) {
                const promise = dadosCronograma.map(async(dia) => {
                    const disciplinas = await cronogramaDAO.selectDiscBySemana(dia.id)

                    if(disciplinas && disciplinas.length>0){
                        dia.disciplinas = disciplinas
                    }
                })

                await Promise.all(promise)

                const cronogramaInfo = {
                    aluno_id: dadosAluno[0].id,
                    nome: dadosAluno[0].nome,
                    cronograma: dadosCronograma
                }                

                cronogramaJSON.aluno = cronogramaInfo
                cronogramaJSON.status_code = 200
                return cronogramaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    getBuscarCronogramaByAlunoId
}