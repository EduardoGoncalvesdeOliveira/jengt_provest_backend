// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de Usuarios
// data: 03/09/2024 - inicio
// autor: Eduardo Gonçalves de Oliveira
// versao: 1.0

// import do arquivo DAO para manipular dados do BD
const alunoDAO = require('../model/DAO/alunos')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo admin no DBA
const setNovoAluno = async(dadosAluno, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAlunos = {}

            console.log(dadosAluno);

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosAluno.nome == ''             || dadosAluno.nome == undefined              || dadosAluno.nome.length > 100       ||
                dadosAluno.email == ''             || dadosAluno.email == undefined             || dadosAluno.email.length > 120      ||
                dadosAluno.telefone == ''          || dadosAluno.telefone == undefined          || dadosAluno.telefone.length > 12    ||
                dadosAluno.senha == ''             || dadosAluno.senha == undefined             || dadosAluno.senha.length > 32){
                    
                 return message.ERROR_REQUIRED_FIELDS // 400
                 
            } else {
                //envia os dados para o DAO inserir no BD
                let novoAluno = await alunoDAO.insertAluno(dadosAluno)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoAluno) {
                    
                    let id = await alunoDAO.selectLastId()
                    
                    dadosAluno.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAlunos.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosAlunos.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosAlunos.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosAlunos.aluno = dadosAluno
                    return resultDadosAlunos
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um admin existente
const setAtualizarAluno = async (dadosAluno, contentType, id) => {
    try {
        
        let aluno = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAluno = {}

            if (dadosAluno.nome == ''             || dadosAluno.nome == undefined              || dadosAluno.nome.length > 100       ||
                dadosAluno.email == ''             || dadosAluno.email == undefined             || dadosAluno.email.length > 120      ||
                dadosAluno.telefone == ''          || dadosAluno.telefone == undefined          || dadosAluno.telefone.length > 12    ||
                dadosAluno.senha == ''             || dadosAluno.senha == undefined             || dadosAluno.senha.length > 32 ){

                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let alunoAtualizado = await alunoDAO.updateAluno(dadosAluno, aluno);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (alunoAtualizado) {

                    dadosAluno.id = aluno

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAluno.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAluno.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAluno.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAluno.aluno = dadosAluno

                    return resultDadosAluno
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
console.log(error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// delete/put: função para esconder um admin existente
// const setEditarExcluirUsuario = async (id) => {
//     try {
//         let usuario = id
//         let valUsuario  = await getBuscarAdmin(usuario)
//         let resultDadosUsuario

//         if (usuario == '' || usuario == undefined || isNaN(usuario)) {
//             return message.ERROR_INVALID_ID // 400
//         } else if(valUsuario.status == false){
//             return message.ERROR_NOT_FOUND // 404
//         }else {

//             //envia os dados para a model inserir no BD
//             resultDadosUsuario = await usuarioDAO.setEditarExcluirUsuario(usuario)
//             //Valida se o BD inseriu corretamente os dados
//             if (resultDadosUsuario)
//                 return message.SUCCESS_DELETED_ITEM // 200
//             else
//                 return message.ERROR_INTERNAL_SERVER_DBA // 500

//         }
        
//     } catch (error) {
//         message.ERROR_INTERNAL_SERVER // 500
//     }
// }

// put: função para achar um admin existente
const setEditarRenovarAluno = async (id) => {
    try {
        let aluno = id
        let resultDadosAluno

        if (aluno == '' || aluno == undefined || isNaN(aluno)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosAluno = await alunoDAO.updateRecoverAluno(aluno)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAluno)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os admins existentes no DBA
const getListarAlunos = async () => {
    let alunoJSON = {}
    let dadosAlunos = await alunoDAO.selectAllAlunos()

    if (dadosAlunos) {
        if (dadosAlunos.length > 0) {
            alunoJSON.usuarios = dadosAlunos
            alunoJSON.qt = dadosAlunos.length
            alunoJSON.status_code = 200
            return alunoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um admin pelo ID
const getBuscarAluno = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idAluno = id;
    let alunoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAluno = await alunoDAO.selectByIdAluno(idAluno)

        if (dadosAluno) {
            // validação para verificar se existem dados de retorno
            if (dadosAluno.length > 0) {
                alunoJSON.aluno = dadosAluno
                alunoJSON.status_code = 200
                return alunoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um admin filtrando pelo nome
const getAlunoByNome = async (nome) => {
    let usuarioJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosAluno = await alunoDAO.selectByNome(filtro)
        if (dadosAluno) {
            if (dadosAluno.length > 0) {
                usuarioJSON.usuario = dadosAluno
                usuarioJSON.qt = dadosAluno.length
                usuarioJSON.status_code = 200
                return usuarioJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

const setAtualizarAlunoSenha = async(dadosAluno, contentType, idAluno) => {

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosUsuario = {}
        
            if( 
                idAluno == ''          || idAluno == undefined          ||
                dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 100 ||
                dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 50 
            ){
                
                return message.ERROR_REQUIRED_FIELDS // 400
                
            }else{
                
                let alunoAtualizado = await alunoDAO.updateAlunoSenha(dadosAluno, idAluno)
                                        
                dadosAluno.id = idAluno

                if(alunoAtualizado){
                    resultDadosUsuario.status = message.UPDATED_ITEM.status
                    resultDadosUsuario.status_code = message.UPDATED_ITEM.status_code
                    resultDadosUsuario.message = message.UPDATED_ITEM.message
                    resultDadosUsuario.aluno = dadosAluno
                    return resultDadosUsuario
                }else {

                    return message.ERROR_INTERNAL_SERVER_DBA // 500

                }
                
            }
    
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }

}

const getValidarAluno = async(email, senha, contentType) => {
    
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
    
            let emailAluno = email
            let senhaAluno = senha
            let alunoJSON = {}

            if(emailAluno == '' || emailAluno == undefined || senhaAluno == '' || senhaAluno == undefined){

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                let dadosAluno = await usuarioDAO.selectValidacaoUsuario(emailAluno, senhaAluno)

                console.log(dadosAluno);
                if(dadosAluno){

                    if(dadosAluno.length > 0){         

                        let aluno = dadosAluno

                        alunoJSON.status = message.VALIDATED_ITEM.status       
                        alunoJSON.status_code = message.VALIDATED_ITEM.status_code       
                        alunoJSON.message = message.VALIDATED_ITEM.message       
                        alunoJSON.aluno = aluno
                
                        return alunoJSON
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }

                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
            
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }

}


module.exports = {
    getValidarAluno,
    setNovoAluno,
    setAtualizarAlunoSenha,
    setAtualizarAluno,
    //setEditarExcluiUsuario,
    setEditarRenovarAluno,
    getListarAlunos,
    getBuscarAluno,
    getAlunoByNome
}