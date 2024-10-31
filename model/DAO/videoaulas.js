/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de videoaulas
* Data: 31/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos as videoaulas
const selectAllVideoaulas = async () => {

    try {
        let sql = `select tbl_videoaulas.titulo, tbl_videoaulas.duracao, tbl_topicos.nome as topico
                    from tbl_videoaulas
                    inner join tbl_topicos on tbl_videoaulas.topico_id=tbl_topicos.id
                    order by tbl_videoaulas.id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsVideoaula = await prisma.$queryRawUnsafe(sql)

        return rsVideoaula

    } catch (error) {
        return false
    }
}

// get: buscar a videoaula existente filtrando pelo ID
const selectByIdVideoaula = async (id) => {
    try {
        // realiza a busca do aluno pelo id
        let sql = `select tbl_videoaulas.titulo, tbl_videoaulas.duracao, tbl_topicos.nome as topico
                    from tbl_videoaulas
                    inner join tbl_topicos on tbl_videoaulas.topico_id=tbl_topicos.id
                    where tbl_videoaulas.id=${id}`

        // executa no DBA o script SQL
        let rsVideoaula = await prisma.$queryRawUnsafe(sql)
        return rsVideoaula

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: filtrar videoaula pelo topico
const selectVideoaulaByTopico = async (topico) => {
    try {
        id = topico

        // realiza a busca do aluno pelo id
        let sql = `select tbl_videoaulas.titulo, tbl_videoaulas.duracao
                    from tbl_videoaulas
                    inner join tbl_topicos on tbl_videoaulas.topico_id=tbl_topicos.id
                    where tbl_videoaulas.topico_id=${id}`

        // executa no DBA o script SQL
        let rsVideoaula = await prisma.$queryRawUnsafe(sql)
        return rsVideoaula

    } catch (error) {
        console.log(error);
        return false
    }
}

//  post: inserir
const insertVideoaulas = async(dadosVideoaula) => {
    try {
        let sql

        sql = `insert into tbl_videoaulas (titulo, duracao, topico_id)values(
                '${dadosVideoaula.titulo}',
                '${dadosVideoaula.duracao}',
                ${dadosVideoaula.topico_id}
            )`
            
            // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
            // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
            let result = await prisma.$executeRawUnsafe(sql)

            // validação para verificar se o insert funcionou no DB
        if(result){
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllVideoaulas,
    selectByIdVideoaula,
    selectVideoaulaByTopico,
    insertVideoaulas
}