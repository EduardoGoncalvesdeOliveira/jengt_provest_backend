/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de icones
* Data: 17/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: buscar o icone existente filtrando pelo ID
const selectByIdIcone = async (id) => {
    try {
        // realiza a busca do prof pelo id
        let sql = `select * from tbl_icones where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsIcon = await prisma.$queryRawUnsafe(sql)
        return rsIcon

    } catch (error) {
        return false
    }
}

module.exports={
    selectByIdIcone
}