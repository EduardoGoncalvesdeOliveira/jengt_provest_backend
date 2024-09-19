/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de cursos
* Data: 19/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// post: inserir curso
const insertCurso = async(dadosCurso) => {
    try {
        let sql
    
        sql = `insert into tbl_cursos (nome)values(
                '${dadosCurso.nome}'
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

// put: atualizar um curso existente filtrando pelo ID
const updateCurso = async(dadosCurso, id) => {
    try {
        let sql 

        sql = `update tbl_cursos set 
                                    nome = "${dadosCurso.nome}
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

// get: listar todos os cursos
const selectAllCursos = async () => {

    try {
        let sql = `select id, nome from tbl_cursos order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsCurso = await prisma.$queryRawUnsafe(sql)

        return rsCurso

    } catch (error) {
        return false
    }
}

// get: buscar o curso existente filtrando pelo ID
const selectByIdCurso = async (id) => {

    try {

        // realiza a busca do curso pelo id
        let sql = `select id, nome from tbl_cursos where id=${id}`

        // executa no DBA o script SQL
        let rsCurso = await prisma.$queryRawUnsafe(sql)
        return rsCurso

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar o curso existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = ` select id, nome from tbl_cursos where nome like '%${nome}%'`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsCurso = await prisma.$queryRawUnsafe(sql)

        return rsCurso
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_cursos limit 1' 

        let rsCurso = await prisma.$queryRawUnsafe(sql)

        return rsCurso

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}

module.exports={
    insertCurso,
    updateCurso,
    selectAllCursos,
    selectByIdCurso,
    selectByNome,
    selectLastId
}