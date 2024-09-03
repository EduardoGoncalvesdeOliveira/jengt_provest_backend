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


<h3> admin </h3>

- listar todos 
```
/v1/leilao_expresso/admins
```
- filtrar pelo nome 
```
/v1/leilao_expresso/admins/filtro
```
- filtrando pelo ID
```
/v1/leilao_expresso/admin/:id
```
- inserir
```
/v1/leilao_expresso/admin
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/admin/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/admin/ativar/:id
```
- editar
```
/v1/leilao_expresso/admin/:id
```
