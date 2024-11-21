/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de lembretes
* Data: 21/11/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/


// import do arquivo DAO para manipular dados do BD
const lembreteDAO = require('../model/DAO/calendario.js')
const controllerAlunos =  require('./controller_alunos.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo lembrete no DBA
const setNovoLembrete = async(dadosLembrete, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // cria a variável JSON
            let resultDadosLembrete = {}
            let valAluno = await controllerAlunos.getBuscarAluno(dadosLembrete.aluno_id)

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosLembrete.titulo == ''     || dadosLembrete.titulo == undefined       || dadosLembrete.titulo.length > 255       ||
                dadosLembrete.descricao == ''   || dadosLembrete.descricao == undefined    || dadosLembrete.descricao.length > 65535  ||
                dadosLembrete.data == ''        || dadosLembrete.data == undefined         || dadosLembrete.data.length > 10          ||
                dadosLembrete.aluno_id == ''    || dadosLembrete.aluno_id == undefined     || valAluno.status == false                ||
                dadosLembrete.horario == ''     || dadosLembrete.horario == undefined      || dadosLembrete.horario.length > 18
                ){    
                 return message.ERROR_REQUIRED_FIELDS // 400      
                } else {

                    //envia os dados para o DAO inserir no BD
                let novoLembrete = await lembreteDAO.insertLembrete(dadosLembrete)
                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoLembrete) {
                    let id = await lembreteDAO.selectLastId()             
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosLembrete.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosLembrete.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosLembrete.message = message.SUCCESS_CREATED_ITEM.message

                    return resultDadosLembrete
                } 
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.error('Erro ao criar lembrete: ', error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os lembretes existentes no DBA
const getListarLembretes = async () => {
    let lembreteJSON = {}
    let dadosLembrete = await lembreteDAO.selectAllLembretes()

    if (dadosLembrete) {
        if (dadosLembrete.length > 0) {
            lembreteJSON.lembretes = dadosLembrete
            lembreteJSON.qt = dadosLembrete.length
            lembreteJSON.status_code = 200
            return lembreteJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar lembretes especificado pelo ID do aluno
const getBuscarLembreteByAlunoId = async (id) => {
    // recebe o id
    let idAluno = id;
    let lembreteJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosLembrete = await lembreteDAO.selectByIdAluno(idAluno)
        if (dadosLembrete) {
            // validação para verificar se existem dados de retorno
            if (dadosLembrete.length > 0) {
                lembreteJSON.lembrete = dadosLembrete
                lembreteJSON.status_code = 200
                return lembreteJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    setNovoLembrete,
    getListarLembretes,
    getBuscarLembreteByAlunoId
}