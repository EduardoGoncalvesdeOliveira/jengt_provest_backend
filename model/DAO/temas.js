/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de temas
* Data: 08/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: buscar o tema existente filtrando pelo ID
const selectByIdTema = async (id) => {
    try {
        // realiza a busca do prof pelo id
        let sql = `select * from tbl_tema where id=${id}`

        // executa no DBA o script SQL
        let rsTemas = await prisma.$queryRawUnsafe(sql)
        return rsTemas

    } catch (error) {
        return false
    }
}

// get: listar todos os temas
const selectAllTemas = async () => {

    try {
        let sql = `select id, nome, descricao from tbl_tema order by id desc`
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
        
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsTemas = await prisma.$queryRawUnsafe(sql)        

        return rsTemas

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    selectByIdTema,
    selectAllTemas
}