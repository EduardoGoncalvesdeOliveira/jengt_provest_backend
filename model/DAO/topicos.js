/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de topicos
* Data: 26/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos as alternativas
const selectAllTopicos = async () => {

    try {
        let sql = `select tbl_topicos.id, tbl_topicos.nome 
                    from tbl_topicos order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsTopicos = await prisma.$queryRawUnsafe(sql)

        return rsTopicos

    } catch (error) {
        return false
    }
}

// get: buscar alternativas de uma questao existente filtrando pelo ID dela
const selectByIdTopico = async(id) => {
    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_topicos.id, tbl_topicos.nome 
                    from tbl_topicos where id=${id}`

        // executa no DBA o script SQL
        let rsTopicos = await prisma.$queryRawUnsafe(sql)
        return rsTopicos

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllTopicos,
    selectByIdTopico
}