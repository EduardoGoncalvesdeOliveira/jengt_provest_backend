/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de alternativas
* Data: 26/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos as alternativas
const selectAllAlternativas = async () => {

    try {
        let sql = `select tbl_alternativas.id, tbl_exercicio.questao, tbl_alternativas.opcao
                    from tbl_alternativas inner join tbl_exercicio on tbl_alternativas.questao_id=tbl_exercicio.id 
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsAlternativas = await prisma.$queryRawUnsafe(sql)

        return rsAlternativas

    } catch (error) {
        return false
    }
}

// get: buscar alternativas de uma questao existente filtrando pelo ID dela
const selectAlternativasByIdQuestao = async(id) => {
    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_alternativas.id, tbl_alternativas.opcao, tbl_alternativas.resposta from tbl_alternativas
                    inner join tbl_exercicio on tbl_alternativas.questao_id=tbl_exercicio.id
                    where tbl_exercicio.id=${id}`

        // executa no DBA o script SQL
        let rsAlternativas = await prisma.$queryRawUnsafe(sql)
        return rsAlternativas

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllAlternativas,
    selectAlternativasByIdQuestao
}