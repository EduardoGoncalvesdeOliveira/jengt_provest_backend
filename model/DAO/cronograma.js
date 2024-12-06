/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           do cronograma
* Data: 21/11/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: filtrar os cronogramas do aluno
const selectCronogramaByAlunoId = async (id) => {

    try {
        // realiza a busca do aluno pelo id
        let sql = `select tbl_cronograma.aluno_id, tbl_aluno.nome, tbl_cron_semana.carga_horaria, tbl_semana.nome as dias, tbl_disciplina.nome as disciplinas
                    from tbl_cronograma 
                    inner join tbl_aluno on tbl_aluno.id=tbl_cronograma.aluno_id
                    inner join tbl_cron_semana on tbl_cron_semana.cronograma_id=tbl_cronograma.id
                    inner join tbl_semana on tbl_semana.id=tbl_cron_semana.semana_id
                    inner join tbl_cron_semana_disciplina as cd on cd.cron_semana_id=tbl_cron_semana.id
                    inner join tbl_disciplina on tbl_disciplina.id=cd.disciplina_id
                    where tbl_cronograma.aluno_id=${id}`

        // executa no DBA o script SQL
        let rsCronograma = await prisma.$queryRawUnsafe(sql)
        return rsCronograma

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectDiasSemana = async(id) => {
    try {
        // realiza a busca do aluno pelo id
        let sql = `select tcs.id, ts.nome as dia, time_format(tcs.carga_horaria, '%H:%i') as carga_horaria from tbl_semana as ts
                    inner join tbl_cron_semana as tcs on ts.id=tcs.semana_id
                    inner join tbl_cronograma as tc on tcs.cronograma_id=tc.id
                    where tc.aluno_id =${id}`

        // executa no DBA o script SQL
        let rsCronograma = await prisma.$queryRawUnsafe(sql)
        return rsCronograma

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectDiscBySemana = async(id) => {
    try {
        // realiza a busca do aluno pelo id
        let sql = `select td.id, td.nome from tbl_disciplina as td 
                    inner join tbl_cron_semana_disciplina as tcsd on tcsd.disciplina_id=td.id
                    where tcsd.cron_semana_id=${id}`

        // executa no DBA o script SQL
        let rsCronograma = await prisma.$queryRawUnsafe(sql)
        return rsCronograma

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectCronogramaByAlunoId,
    selectDiasSemana,
    selectDiscBySemana
}