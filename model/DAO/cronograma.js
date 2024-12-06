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

// get: filtrar as redações do aluno
const selectCronogramaByAlunoId = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_redacao.id, tbl_redacao.titulo, tbl_redacao.texto, tbl_tema.nome as tema, tbl_redacao.status 
                    from tbl_redacao 
                    inner join tbl_tema on tbl_redacao.tema_id=tbl_tema.id  
                    where tbl_redacao.aluno_id=${id}`

        // executa no DBA o script SQL
        let rsRedacao = await prisma.$queryRawUnsafe(sql)
        return rsRedacao

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectCronogramaByAlunoId
}