/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de vestibulares e fases
* Data: 05/11/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir
const insertVestFase = async(dadosVestFase) => {
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

// get: listar todos os vest fases
const selectAllVestFases = async () => {

    try {
        let sql = `select tbl_vestibulares.nome, tbl_vestibulares.data_prova, tbl_instituicoes.nome, tbl_instituicoes.sigla, tbl_fases.fase
                    from tbl_vest_fases
                    left join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    left join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
                    left join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id
                    order by tbl_vest_fases.id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsRedacao = await prisma.$queryRawUnsafe(sql)

        return rsRedacao

    } catch (error) {
        return false
    }
}

// get: buscar o vest e fase existente filtrando pelo ID
const selectByIdVestFase = async (id) => {

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

// get: buscar o vest e fase existente filtrando pela instituicao desejada
const selectByInstituicao = async (titulo) => {
    
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

// get: buscar o vest e fase existente filtrando pela data di vestibular
const selectByDataVest = async (titulo) => {
    
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