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

// get: listar todos as redacoes
const selectAllRedacoes = async () => {

    try {
        let sql = `select tbl_redacao.id, tbl_redacao.titulo, tbl_redacao.texto, tbl_tema.nome as tema, tbl_redacao.status 
                    from tbl_redacao 
                    inner join tbl_tema on tbl_redacao.tema_id=tbl_tema.id 
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsRedacao = await prisma.$queryRawUnsafe(sql)

        return rsRedacao

    } catch (error) {
        return false
    }
}

// get: buscar o aluno existente filtrando pelo ID
const selectByIdRedacao = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_redacao.id, tbl_redacao.titulo, tbl_redacao.texto, tbl_tema.nome as tema, tbl_redacao.status 
                    from tbl_redacao 
                    inner join tbl_tema on tbl_redacao.tema_id=tbl_tema.id  
                    where tbl_redacao.id=${id}`

        // executa no DBA o script SQL
        let rsRedacao = await prisma.$queryRawUnsafe(sql)
        return rsRedacao

    } catch (error) {
        console.log(error);
        return false
    }
}


// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_redacao limit 1' 

        let rsRedacao = await prisma.$queryRawUnsafe(sql)

        return rsRedacao

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}

// get: filtrar as redações do aluno
const selectByAlunoIdRedacao = async (id) => {

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
    selectAllRedacoes,
    selectByIdRedacao,
    selectLastId,
    selectByAlunoIdRedacao
}