/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de professores
* Data: 03/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const professorDAO = require('../model/DAO/professor.js')
const controllerIcone = require('./controller-icones.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo professor
const setNovoProfessor = async (dadosProf, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosProfs = {}
            const icone = controllerIcone.getBuscarIcone(dadosProf.icone_id)

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosProf.nome == ''        || dadosProf.nome == undefined         || dadosProf.nome.length > 150      ||
                dadosProf.email == ''       || dadosProf.email == undefined        || dadosProf.email.length > 256     ||
                dadosProf.senha == ''       || dadosProf.senha == undefined        || dadosProf.senha.length > 32      ||
                dadosProf.icone_id == ''    || dadosProf.icone_id == undefined     || icone.status == false
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novoProf = await professorDAO.insertProfessor(dadosProf)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoProf) {
                    let id = await professorDAO.selectLastId()

                    dadosProf.id = Number(id[0].id)

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProfs.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosProfs.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosProfs.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosProfs.professor = dadosProf
                    return resultDadosProfs
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um prof existente
const setAtualizarProfessor = async (dadosProf, contentType, id) => {
    try {

        let professor = id

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosProfs = {}

            if (dadosProf.nome == ''     || dadosProf.nome == undefined     || dadosProf.nome.length > 150      ||
                dadosProf.email == ''    || dadosProf.email == undefined    || dadosProf.email.length > 256     ||
                dadosProf.icone_id == '' || dadosProf.icone_id == undefined || dadosProf.icone_id.length > 255
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {

                //envia os dados para o DAO inserir no BD
                let profAtt = await professorDAO.updateProfessor(dadosProf, professor);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (profAtt) {

                    dadosProf.id = professor

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProfs.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosProfs.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosProfs.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosProfs.professor = dadosProf

                    return resultDadosProfs
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

// delete/put: função para esconder/"excluir" um professor existente
const setEditarExcluirProf = async (id) => {
    try {
        let professor = id
        let valProfessor = await getBuscarProfessor(professor)
        let resultDadosProfs

        if (professor == '' || professor == undefined || isNaN(professor)) {
            return message.ERROR_INVALID_ID // 400
        } else if (valProfessor.status == false) {
            return message.ERROR_NOT_FOUND // 404
        } else {

            //envia os dados para a model inserir no BD
            resultDadosProfs = await professorDAO.updateDeleteProfessor(professor)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosProfs)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um icone existente
const setAtualizarIcone = async (icone, id) => {
    try {        
            // cria a variável JSON
            let resultDadosProf = {}

            if (
                icone == '' || icone == undefined || icone == false ||
                id == ''    || id == undefined    || id == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                console.log(icone, id);
                
                //envia os dados para o DAO inserir no BD
                let iconeAtt = await professorDAO.updateIcone(icone, id);                

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (iconeAtt) {

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProf.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosProf.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosProf.message = message.SUCCESS_UPDATED_ITEM.message

                    return resultDadosProf
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar um prof existente
const setEditarAtivarProf = async (id) => {
    try {
        let professor = id
        let resultDadosProfs

        if (professor == '' || professor == undefined || isNaN(professor)) {
            return message.ERROR_INVALID_ID // 400
        } else {

            //envia os dados para a model inserir no BD
            resultDadosProfs = await professorDAO.updateRecoverProfessor(professor)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosProfs)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os profs existentes no DBA
const getListarProfessores = async () => {
    let professoresJSON = {}
    let dadosProfs = await professorDAO.selectAllProfessores()

    if (dadosProfs) {
        if (dadosProfs.length > 0) {
            const promise = dadosProfs.map(async (prof) => {
                const disciplinas = await professorDAO.selectDisciplinasByProfId(prof.id)
                if (disciplinas) {
                    let discArray = []
                    disciplinas.forEach((disc) => {
                        discArray.push(disc.nome)
                    });
                    prof.disciplinas = discArray
                }

            })

            await Promise.all(promise)

            professoresJSON.professores = dadosProfs
            professoresJSON.qt = dadosProfs.length
            professoresJSON.status_code = 200
            return professoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um professor pelo ID
const getBuscarProfessor = async (id) => {
    // recebe o id
    let idProf = id;
    let professoresJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idProf == '' || idProf == undefined || isNaN(idProf)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosProf = await professorDAO.selectByIdProfessor(idProf)

        if (dadosProf) {
            // validação para verificar se existem dados de retorno
            if (dadosProf.length > 0) {
                const promise = dadosProf.map(async (prof) => {
                    const disciplinas = await professorDAO.selectDisciplinasByProfId(prof.id)
                    if (disciplinas) {
                        let discArray = []
                        disciplinas.forEach((disc) => {
                            discArray.push(disc.nome)
                        });
                        prof.disciplinas = discArray
                    }
    
                })
    
                await Promise.all(promise)
                professoresJSON.usuario = dadosProf
                professoresJSON.status_code = 200
                return professoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um prof filtrando pelo nome
const getProfessorByNome = async (nome) => {
    let professoresJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosProf = await professorDAO.selectByNome(filtro)
        if (dadosProf) {
            if (dadosProf.length > 0) {
                if (dadosProf.length > 0) {
                    const promise = dadosProf.map(async (prof) => {
                        const disciplinas = await professorDAO.selectDisciplinasByProfId(prof.id)
                        if (disciplinas) {
                            let discArray = []
                            disciplinas.forEach((disc) => {
                                discArray.push(disc.nome)
                            });
                            prof.disciplinas = discArray
                        }

                    })

                    await Promise.all(promise)

                    professoresJSON.professor = dadosProf
                    professoresJSON.qt = dadosProf.length
                    professoresJSON.status_code = 200
                    return professoresJSON
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DBA // 500
            }
        }
    }
}

const setAtualizarProfSenha = async (dadosProf, contentType, idProf) => {

    try {
        let professor = idProf

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosProfs = {}

            if (dadosProf.senha == ''     || dadosProf.senha == undefined     || dadosProf.senha.length > 32) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {

                //envia os dados para o DAO inserir no BD
                let profAtt = await professorDAO.updateProfSenha(dadosProf, professor);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (profAtt) {

                    dadosProf.id = professor

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProfs.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosProfs.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosProfs.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosProfs.professor = dadosProf

                    return resultDadosProfs
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

const getValidarProf = async (dadosProf, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let emailProf = dadosProf.email
            let senhaProf = dadosProf.senha
            let professoresJSON = {}

            if (emailProf == '' || emailProf == undefined || senhaProf == '' || senhaProf == undefined) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let dadosProf = await professorDAO.selectValidacaoProf(emailProf, senhaProf)

                if (dadosProf) {
                    if (dadosProf.length > 0) {
                        let professor = dadosProf

                        professoresJSON.status = message.VALIDATED_ITEM.status
                        professoresJSON.status_code = message.VALIDATED_ITEM.status_code
                        professoresJSON.message = message.VALIDATED_ITEM.message
                        professoresJSON.professor = professor

                        return professoresJSON
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para buscar professores pela disciplina
const getProfByDisc = async (id) => {
    // recebe o id
    let idDisciplina = id;
    let professoresJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosProf = await professorDAO.selectProfByDisciplina(idDisciplina)

        if (dadosProf) {
            // validação para verificar se existem dados de retorno
            if (dadosProf.length > 0) {
                // const promise = dadosProf.map(async (disciplinas) => {
                //     const disciplinas = await professorDAO.selectDisciplinasByProfId(disciplinas.id)
                //     if (professores) {
                //         let profArray = []
                //         professores.forEach((profs) => {
                //             profArray.push(profs.nome)
                //         });
                //         disciplinas.professores = profArray
                //     }
                // })
    
                await Promise.all(promise)
                professoresJSON.professores = dadosProf
                professoresJSON.status_code = 200
                return professoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

module.exports = {
    setNovoProfessor,
    setAtualizarProfessor,
    setAtualizarIcone,
    setEditarExcluirProf,
    setEditarAtivarProf,
    getListarProfessores,
    getBuscarProfessor,
    getProfessorByNome,
    setAtualizarProfSenha,
    getProfByDisc
}