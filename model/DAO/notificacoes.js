/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de notificacoes
* Data: 03/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos os alunos
const selectAllNotificacoes = async () => {

    try {
        let sql = `select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome as vestibular, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_vest_fases.fase_id
                    from tbl_notificacoes 
                    inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
                    inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    order by tbl_notificacoes.id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsNotificacoes = await prisma.$queryRawUnsafe(sql)

        return rsNotificacoes

    } catch (error) {
        return false
    }
}

// get: buscar o aluno existente filtrando pelo ID
const selectById = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome as vestibular, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_vest_fases.fase_id
                    from tbl_notificacoes 
                    inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
                    inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
					where tbl_notificacoes.id=${id}`

        // executa no DBA o script SQL
        let rsNotificacoes = await prisma.$queryRawUnsafe(sql)
        return rsNotificacoes

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar a notificacao existente filtrando pelo nome do vestibular
const selectByVestibular = async (nomeVest) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome as vestibular, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_vest_fases.fase_id
                    from tbl_notificacoes 
                    inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
                    inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
					where tbl_vestibulares.nome like '%${nomeVest}%'`

        // executa no DBA o script SQL
        let rsNotificacoes = await prisma.$queryRawUnsafe(sql)
        return rsNotificacoes

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllNotificacoes,
    selectById,
    selectByVestibular
}