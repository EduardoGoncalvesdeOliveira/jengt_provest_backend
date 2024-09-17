/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de professores
* Data: 03/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir prof
const insertProfessor = async(dadosProf) => {
    try {
        let sql
    
        sql = `insert into tbl_professor (nome, email, senha, icone_id, status)values(
                '${dadosProf.nome}',
                '${dadosProf.email}',
                md5('${dadosProf.senha}'),
                '${dadosProf.icone_id}',
               true
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
        return false
    }
}

// put: atualizar um prof existente filtrando pelo ID
const updateProfessor = async(dadosProf, id) => {
    try {
        let sql 

        sql = `update tbl_professor set 
                                            nome = "${dadosProf.nome}",
                                            email = "${dadosProf.email}",
                                            icone_id = "${dadosProf.icone_id}",
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

// delete/put: método put apenas trocando o status, para "esconder" um prof filtrando pelo ID
const updateDeleteProfessor = async(id) => {
    try {
        let sql = `update tbl_professor set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsProf = await prisma.$executeRawUnsafe(sql)
        
        return rsProf

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer um prof antes escondido
const updateRecoverProfessor = async(id) => {
    try {
        let sql = `update tbl_professor set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsProf = await prisma.$executeRawUnsafe(sql)
        
        return rsProf

    } catch (error) {
        return false
    }
}

// get: listar todos os profs
const selectAllProfessores = async () => {

    try {
        let sql = 'select nome, email, senha from tbl_professor where status=true order by nome asc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsProf = await prisma.$queryRawUnsafe(sql)

        return rsProf

    } catch (error) {
        return false
    }
}

// get: buscar o prof existente filtrando pelo ID
const selectByIdProfessor = async (id) => {

    try {

        // realiza a busca do prof pelo id
        let sql = `select * from tbl_professor where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsProf = await prisma.$queryRawUnsafe(sql)
        return rsProf

    } catch (error) {
        return false
    }
}

// get: buscar o prof existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_professor where nome like '%${nome}%' and status=true`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsProf = await prisma.$queryRawUnsafe(sql)

        return rsProf
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_professor limit 1' 

        let rsProf = await prisma.$queryRawUnsafe(sql)

        return rsProf

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}

const updateProfSenha = async (dadosProf, idProf) => {

    try {
        let sql = `update tbl_professor set nome = '${dadosProf.nome}', email = '${dadosProf.email}', senha = md5('${dadosProf.senha}') where id = ${idProf}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const selectValidacaoProf = async (email, senha) => {

    try {
        let sql = `select nome, email from tbl_professor where email = '${email}' and senha = md5('${senha}')`
        let rsProf = await prisma.$queryRawUnsafe(sql)
        return rsProf        
    } catch (error) {
        return false
    }

}

module.exports={
    insertProfessor,
    updateProfessor,
    updateDeleteProfessor,
    updateRecoverProfessor,
    selectAllProfessores,
    selectByIdProfessor,
    selectByNome,
    selectLastId,
    updateProfSenha,
    selectValidacaoProf
}