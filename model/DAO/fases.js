/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de fases dos vestibulares
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: buscar a fase existente filtrando pelo ID
const selectByIdFase = async (id) => {
    try {
        // realiza a busca da fase pelo id
        let sql = `select * from tbl_fases where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsFases = await prisma.$queryRawUnsafe(sql)
        return rsFases

    } catch (error) {
        return false
    }
}

// get: listar todos as fases
const selectAllFases = async () => {

    try {
        let sql = `select * from tbl_fases order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsIcon = await prisma.$queryRawUnsafe(sql)        

        return rsIcon

    } catch (error) {
        //console.log(error)
        return false
    }
}

module.exports={
    selectAllFases,
    selectByIdFase
}