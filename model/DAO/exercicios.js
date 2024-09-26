/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de exercicios
* Data: 24/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// get: listar todos os alunos
const selectAllExercicios = async () => {

    try {
        let sql = `select tbl_exercicio.id, tbl_exercicio.questao, tbl_topicos.nome as topico
                    from tbl_exercicio inner join tbl_topicos on tbl_exercicio.topico_id=tbl_topicos.id 
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsExercicio = await prisma.$queryRawUnsafe(sql)

        return rsExercicio

    } catch (error) {
        return false
    }
}

// get: buscar o aluno existente filtrando pelo ID
const selectByIdExercicio = async (id) => {

    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_exercicio.id, tbl_exercicio.questao, tbl_topicos.nome as topico
                    from tbl_exercicio inner join tbl_topicos on tbl_exercicio.topico_id=tbl_topicos.id 
                    where tbl_exercicio.id=${id}`

        // executa no DBA o script SQL
        let rsExercicio = await prisma.$queryRawUnsafe(sql)
        return rsExercicio

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: filtrar exercício pelo tópico de disciplina
const selectByTopico = async (topico) => {
    try {
        id = topico

        // realiza a busca do aluno pelo id
        let sql = `select tbl_exercicio.id, tbl_exercicio.questao, tbl_alternativas.opcao, tbl_alternativas.resposta, tbl_topicos.nome
                    from tbl_topicos
                    inner join tbl_exercicio on tbl_topicos.id=tbl_exercicio.topico_id
                    inner join tbl_alternativas on tbl_exercicio.id=tbl_alternativas.questao_id
                    where tbl_topicos.id = ${id}`

        // executa no DBA o script SQL
        let rsExercicio = await prisma.$queryRawUnsafe(sql)
        return rsExercicio

    } catch (error) {
        console.log(error);
        return false
    }
}

// get: buscar alternativas de uma questao existente filtrando pelo ID dela
const selectAlternativasByIdQuestao = async(id) => {
    try {

        // realiza a busca do aluno pelo id
        let sql = `select tbl_alternativas.id, tbl_alternativas.opcao, tbl_alternativas.resposta from tbl_alternativas
                    inner join tbl_exercicio on tbl_alternativas.questao_id=tbl_exercicio.id
                    where tbl_exercicio.id=${id}`

        // executa no DBA o script SQL
        let rsExercicio = await prisma.$queryRawUnsafe(sql)
        return rsExercicio

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    selectAllExercicios,
    selectByIdExercicio,
    selectByTopico,
    selectAlternativasByIdQuestao
}