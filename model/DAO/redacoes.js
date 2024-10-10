/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de redacoes
* Data: 01/10/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir
const insertRedacoes = async(dadosRedacao) => {
    try {
        let sql

        sql = `insert into tbl_redacao (titulo, texto, tema_id, status)values(
                '${dadosRedacao.titulo}',
                '${dadosRedacao.texto}',
                ${dadosRedacao.tema_id},
               true
            )`
            
            // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
            // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
            let result = await prisma.$executeRawUnsafe(sql)
//console.log(result);
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
const updateRedacao = async(dadosRedacao, id) => {
    try {
        let sql 

        sql = `update tbl_redacao set 
                                            titulo = "${dadosRedacao.titulo}",
                                            texto = "${dadosRedacao.texto}",
                                            tema_id = ${dadosRedacao.tema_id}
                                            where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result);
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

// get: buscar o aluno existente filtrando pelo nome
const selectByTitulo = async (titulo) => {
    
    try {
        let sql = `select tbl_redacao.id, tbl_redacao.titulo, tbl_redacao.texto, tbl_tema.nome as tema, tbl_redacao.status 
                    from tbl_redacao 
                    inner join tbl_tema on tbl_redacao.tema_id=tbl_tema.id
                    where tbl_redacao.titulo like '%${titulo}%'`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsRedacao = await prisma.$queryRawUnsafe(sql)

        return rsRedacao
        
    } catch (error) {
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


module.exports={
    insertRedacoes,
    updateRedacao,
    selectAllRedacoes,
    selectByIdRedacao,
    selectByTitulo,
    selectLastId
}