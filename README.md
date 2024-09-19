# backend do ProVest
## endpoints:
<br>

#### Hospedagem

<div>
  <img src="https://img.shields.io/badge/Render-0D1117?style=flat-square&logo=render&logoColor=46E3B7" alt="render">
  <img src="https://img.shields.io/badge/Microsoft_Azure-0D1117?style=flat-square&logo=microsoft-azure&logoColor=blue" alt="azure">
</div>
  
```
link do render
```


<h3> aluno </h3>

- listar todos 
```
/v1/jengt_provest/alunos
```
- filtrar pelo nome 
```
/v1/jengt_provest/alunos/filtro
```
- filtrando pelo ID
```
/v1/jengt_provest/aluno/:id
```
- inserir
```
/v1/jengt_provest/aluno
```
- editar o status para false para "exclui-lo"
```
/v1/jengt_provest/aluno/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/jengt_provest/aluno/ativar/:id
```
- editar
```
/v1/jengt_provest/aluno/:id
```
<br>


<h3> professores </h3>

- listar todos 
```
/v1/jengt_provest/profs
```
- filtrar pelo nome 
```
/v1/jengt_provest/profs/filtro
```
- filtrando pelo ID
```
/v1/jengt_provest/prof/:id
```
- inserir
```
/v1/jengt_provest/prof
```
- editar o status para false para "exclui-lo"
```
/v1/jengt_provest/prof/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/jengt_provest/prof/ativar/:id
```
- editar
```
/v1/jengt_provest/prof/:id
```
