/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de instituicoes
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos as instituicoes
const selectAllInstituicoes = async () => {

    try {
        let sql = `select * from tbl_instituicoes order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsInstituicoes = await prisma.$queryRawUnsafe(sql)

        return rsInstituicoes

    } catch (error) {
        return false
    }
}

// get: buscar a instituicao existente filtrando pelo ID
const selectByIdInstituicao = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select * from tbl_instituicoes where id=${id}`

        // executa no DBA o script SQL
        let rsInstituicoes = await prisma.$queryRawUnsafe(sql)
        return rsInstituicoes

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar a instituicao existente filtrando pela sigla
const selectBySiglaInstituicao = async (sigla) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select * from tbl_instituicoes where sigla='${sigla}'`

        // executa no DBA o script SQL
        let rsInstituicoes = await prisma.$queryRawUnsafe(sql)
        return rsInstituicoes

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllInstituicoes,
    selectByIdInstituicao,
    selectBySiglaInstituicao
}