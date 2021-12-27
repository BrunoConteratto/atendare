# Atendare CRUD

Template HTML: <https://github.com/stisla/stisla>

Configurar em **.env** token da API.

Requer NPM

```
npm install
npm run dev
```

## **Rotas**

API:

Rotas para organização.

* **/api/organization/list/:pageIndex/:pageSize** - [GET] Consultar organizações com paginação.
* **/api/organization/create** - [POST] Criar uma organização
* **/api/organization/update/:id** - [POST] Editar uma organização
* **/api/organization/delete/:id** - [DELETE]

Rotas para Leads

* **/api/leads/list/:pageIndex/:pageSize** - [GET] Consultar Leads com paginação
* **/api/lead/create** - [POST] Criar um Lead
* **/api/lead/update/:id** - [POST] Editar um Lead
* **/api/lead/delete/:id** - [DELETE]

APP:

Rotas para organização.

* **/api/organization/list/:pageIndex/:pageSize** - [GET] Consultar organizações com paginação.
* **/api/organization/create** - [GET] Criar uma organização
* **/api/organization/edit/:id** - [GET] Editar uma organização

Rotas para Leads

* **/api/leads/list/:pageIndex/:pageSize** - [GET] Consultar Leads com paginação
* **/api/lead/create** - [GET] Criar um Lead
* **/api/lead/edit/:id** - [GET] Editar um Lead
