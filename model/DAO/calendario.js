/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de calendário
* Data: 21/11/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')
const { insertRedacoes } = require('./redacoes')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir
const insertLembrete = async(dadosLembrete) => {
    try {
        let sql

        sql = `insert into tbl_lembretes (titulo, descricao, data,  aluno_id, horario)values(
                '${dadosAnot.titulo}',
                '${dadosAnot.descricao}',
                '${dadosAnot.data}',
                ${dadosAnot.aluno_id},
                '${dadosAnot.horario}',
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

// get: listar todos as redacoes
const selectAllLembretes = async () => {

    try {
        let sql = `select * from tbl_lembretes order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsLembretes = await prisma.$queryRawUnsafe(sql)

        return rsLembretes

    } catch (error) {
        return false
    }
}

// get: buscar o aluno existente filtrando pelo ID
const selectByIdAluno = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select * from tbl_lembretes where aluno_id=${id}`

        // executa no DBA o script SQL
        let rsLembretes = await prisma.$queryRawUnsafe(sql)
        return rsLembretes

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_lembretes limit 1' 

        let rsLembretes = await prisma.$queryRawUnsafe(sql)

        return rsLembretes

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}

module.exports={
    insertLembrete,
    selectAllLembretes,
    selectByIdAluno,
    selectLastId
}