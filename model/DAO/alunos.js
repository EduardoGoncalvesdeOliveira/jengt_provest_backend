/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de alunos
* Data: 03/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir aluno
const insertAluno = async(dadosAluno) => {
    try {
        let sql
    
        sql = `insert into tbl_aluno (nome, email, senha, icone_id, curso_id, status)values(
                '${dadosAluno.nome}',
                '${dadosAluno.email}',
                md5('${dadosAluno.senha}'),
                '${dadosAluno.icone_id}',
                '${dadosAluno.curso_id}',
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
        console.log(error);
        return false
    }
}

// put: atualizar um aluno existente filtrando pelo ID
const updateAluno = async(dadosAluno, id) => {
    try {
        let sql 

        sql = `update tbl_aluno set 
                                            nome = "${dadosAluno.nome}",
                                            email = "${dadosAluno.email}",
                                            icone_id = "${dadosAluno.icone_id}",
                                            curso_id = "${dadosAluno.curso_id}"
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

// get: atualizar icone dp aluno
const updateIcone = async(idIcone, id) => {
    try {
        let sql = `call updateIconeAluno(${idIcone}, ${id})`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        console.log(sql);
        let rsAluno = await prisma.$executeRawUnsafe(sql)
        return rsAluno

    } catch (error) {
        return false
    }
}

// delete/put: método put apenas trocando o status, para "esconder" um aluno filtrando pelo ID
const updateDeleteAluno = async(id) => {
    try {
        let sql = `update tbl_aluno set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsAluno = await prisma.$executeRawUnsafe(sql)
        
        return rsAluno

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer um aluno antes escondido
const updateRecoverAluno = async(id) => {
    try {
        let sql = `update tbl_aluno set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsAluno = await prisma.$executeRawUnsafe(sql)
        
        return rsAluno

    } catch (error) {
        return false
    }
}

// get: listar todos os alunos
const selectAllAlunos = async () => {

    try {
        let sql = `select tbl_aluno.id, tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso, tbl_aluno.status 
                    from tbl_aluno 
                    inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id 
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

    } catch (error) {
        return false
    }
}

// get: buscar o aluno existente filtrando pelo ID
const selectByIdAluno = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso, tbl_aluno.status from tbl_aluno
                    inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id 
                    where tbl_aluno.id=${id}`

        // executa no DBA o script SQL
        let rsAluno = await prisma.$queryRawUnsafe(sql)
        return rsAluno

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar o aluno existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso, tbl_aluno.status from tbl_aluno
                    inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id 
                    where tbl_aluno.nome like '%${nome}%' and status=true`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_aluno limit 1' 

        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}

// set: atualizar senha
const updateAlunoSenha = async (dadosAluno, idAluno) => {

    try {
        let sql = `update tbl_aluno set senha = md5('${dadosAluno.senha}') where id = ${idAluno}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// get: login
const selectValidacaoAluno = async (emailAluno, senhaAluno) => {
    try {
        let sql = `select email, senha from tbl_aluno where email = '${emailAluno}' and senha = md5('${senhaAluno}')`
        let rsAluno = await prisma.$queryRawUnsafe(sql)
        return rsAluno        
    } catch (error) {
        return false
    }

}

module.exports={
    insertAluno,
    updateAluno,
    updateDeleteAluno,
    updateIcone,
    updateRecoverAluno,
    selectAllAlunos,
    selectByIdAluno,
    selectByNome,
    selectLastId,
    updateAlunoSenha,
    selectValidacaoAluno
}