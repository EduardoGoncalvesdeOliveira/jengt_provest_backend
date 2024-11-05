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


// get: listar todos os vest fases
const selectAllVestFases = async () => {

    try {
        let sql = `select tbl_vestibulares.nome, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_provas, tbl_instituicoes.nome as instituicao, tbl_instituicoes.sigla, tbl_fases.fase
                    from tbl_vest_fases
                    left join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    left join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
                    left join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id
                    order by tbl_vest_fases.id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsVestFases = await prisma.$queryRawUnsafe(sql)

        return rsVestFases

    } catch (error) {
        return false
    }
}

// get: buscar o vest e fase existente filtrando pelo ID
const selectByIdVestFase = async (id) => {

    try {

        // realiza a busca do vest e fase pelo id
        let sql = `select tbl_vestibulares.nome, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_instituicoes.nome, tbl_instituicoes.sigla, tbl_fases.fase
                    from tbl_vest_fases
                    left join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    left join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
                    left join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id 
                    where tbl_vest_fases.id=${id}`

        // executa no DBA o script SQL
        let rsVestFases = await prisma.$queryRawUnsafe(sql)
        return rsVestFases

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar o vest e fase existente filtrando pela instituicao desejada
const selectByInstituicao = async (instituicao) => {
    
    try {
        let sql = ` select tbl_vestibulares.nome, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_instituicoes.nome as instituicao, tbl_instituicoes.sigla, tbl_fases.fase
                    from tbl_vest_fases
                    left join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    left join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
                    left join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id 
                    where tbl_instituicoes.nome like '%${instituicao}%'`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsVestFases = await prisma.$queryRawUnsafe(sql)

        return rsVestFases
        
    } catch (error) {
        return false
    }
}

// get: buscar o vest e fase existente filtrando pela data di vestibular
const selectByDataVest = async (data) => {
    
    try {
        let sql = `select tbl_vestibulares.nome, date_format(tbl_vestibulares.data_prova, "%Y-%m-%d") as data_prova, tbl_instituicoes.nome as instituicao, tbl_instituicoes.sigla, tbl_fases.fase
                    from tbl_vest_fases
                    left join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    left join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
                    left join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id 
                    where tbl_vestibulares.data_prova like '%${data}%'`

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

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_vest_fases limit 1' 

        let rsVestFases = await prisma.$queryRawUnsafe(sql)

        return rsVestFases

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    selectAllVestFases,
    selectByIdVestFase,
    selectByInstituicao,
    selectByDataVest,
    selectLastId
}