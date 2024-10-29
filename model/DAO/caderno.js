/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de caderno do aluno
* Data: 17/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir
const insertAnotacao = async(dadosAnot) => {
    try {
        let sql

        sql = `insert into caderno_aluno (titulo, texto, aluno_id)values(
                '${dadosAnot.titulo}',
                '${dadosAnot.texto}',
                ${dadosAnot.aluno_id}
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

// put: atualizar redação existente filtrando pelo ID
const updateAnotacao = async(dadosAnot, id) => {
    try {
        let sql 

        sql = `update caderno_aluno set 
                                            titulo = "${dadosAnot.titulo}",
                                            texto = "${dadosAnot.texto}",
                                            aluno_id = ${dadosAnot.aluno_id}
                                            where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        // validação para verificar se o insert funcionou no DB
        if(result){
            return true
        } else {
            return false
        }
    
    } catch (error) {
        return false
    }
}

// get: listar todos as anotacoes
const selectAllAnotacoes = async () => {

    try {
        let sql = `select caderno_aluno.id, caderno_aluno.titulo, caderno_aluno.texto 
                    from caderno_aluno 
                    inner join tbl_aluno on caderno_aluno.aluno_id=tbl_aluno.id 
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsAnot = await prisma.$queryRawUnsafe(sql)
        console.log(rsAnot)
        return rsAnot

    } catch (error) {
        return false
    }
}

// get: buscar a anotacao existente filtrando pelo ID
const selectByIdAnot = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select caderno_aluno.id, caderno_aluno.titulo, caderno_aluno.texto 
                    from caderno_aluno
                    inner join tbl_aluno on caderno_aluno.aluno_id=tbl_aluno.id  
                    where caderno_aluno.id=${id}`

        // executa no DBA o script SQL
        let rsAnot = await prisma.$queryRawUnsafe(sql)
        return rsAnot

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar a anotacao existente filtrando pelo nome
const selectByTitulo = async (titulo) => {
    
    try {
        let sql = `select caderno_aluno.id, caderno_aluno.titulo, caderno_aluno.texto
                    from caderno_aluno 
                    inner join tbl_aluno on caderno_aluno.aluno_id=tbl_aluno.id
                    where caderno_aluno.titulo like '%${titulo}%'`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsAnot = await prisma.$queryRawUnsafe(sql)

        return rsAnot
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from caderno_aluno limit 1' 

        let rsAnot = await prisma.$queryRawUnsafe(sql)

        return rsAnot

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    insertAnotacao,
    updateAnotacao,
    selectAllAnotacoes,
    selectByIdAnot,
    selectByTitulo,
    selectLastId
}