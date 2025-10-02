To-Do List - Frontend com Vue.js
Este é o repositório do frontend para uma aplicação de Lista de Tarefas (To-Do List), desenvolvida com Vue 3, Vite e TailwindCSS. A aplicação permite que os usuários se registrem, façam login e gerenciem suas tarefas diárias de forma simples e intuitiva.

✨ Funcionalidades
Autenticação de Usuários: Sistema completo de registro e login de usuários.

Gerenciamento de Tarefas (CRUD):

Criar novas tarefas com título, descrição e data de vencimento.

Visualizar a lista de tarefas.

Editar tarefas existentes.

Marcar tarefas como concluídas/pendentes.

Excluir tarefas.

Interface Reativa: A interface é atualizada em tempo real conforme as tarefas são adicionadas, modificadas ou removidas.

Status de Vencimento: Tarefas com prazo de entrega expirado são visualmente destacadas para o usuário.

Design Responsivo: Utiliza TailwindCSS para uma experiência de usuário agradável em diferentes tamanhos de tela.

🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando tecnologias modernas de desenvolvimento web:

Framework Principal: Vue 3

Build Tool: Vite

Roteamento: Vue Router

Gerenciamento de Estado: Pinia

Estilização: TailwindCSS

Cliente HTTP: Axios para comunicação com a API.

Linting e Formatação: ESLint, Prettier e OXLint para garantir a qualidade e a consistência do código.

📋 Pré-requisitos
Antes de começar, certifique-se de que você tem o Node.js instalado em sua máquina. A versão recomendada está especificada no arquivo package.json.

Node.js: ^20.19.0 || >=22.12.0

Importante: Este projeto é apenas o frontend. Você precisará de uma API backend rodando em http://localhost:8000 para que a aplicação funcione corretamente.

🚀 Instalação e Execução
Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento local:

Clone o repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
cd todo-vue-front
Instale as dependências:

Bash

npm install
Execute o servidor de desenvolvimento:
O comando abaixo iniciará a aplicação em modo de desenvolvimento com hot-reload.

Bash

npm run dev
Abra seu navegador e acesse http://localhost:5173 (ou a porta indicada no terminal).

📜 Scripts Disponíveis
Além do script de desenvolvimento, os seguintes comandos estão disponíveis:

npm run build: Compila e minifica a aplicação para produção.

npm run preview: Inicia um servidor local para visualizar a build de produção.

npm run lint: Executa o linter (ESLint e OXLint) para encontrar e corrigir problemas no código.

npm run format: Formata todo o código do projeto utilizando o Prettier.

🔧 Configuração de Ambiente Recomendada
IDE: VS Code

Extensões Recomendadas (VS Code):

Vue (Official) (desabilite o Vetur se estiver instalado).

ESLint

Prettier - Code formatter

Oxc

EditorConfig for VS Code