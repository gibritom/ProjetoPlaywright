# cron-auto-ide

Automação das funcionalidades e Regressões da IDE

### Pré-requisitos 📓

<hr>

Softwares: [Node](https://nodejs.org/en/download) |
[VsCode](https://code.visualstudio.com/Download) /
Extensões VsCode: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Configurações da VsCode 📦

---

1. Acesse o Settings do VsCode
2. Pesquise por Format
3. No campo: <b>Editor: Default Formatter</b>, selecione a opção <b>Prettir - Code formatter</b>
4. Ative a opção: <b> Editor: Format On Save</b>
5. Pesquise por save
6. Marque a opção <b> Files: Auto Save</b> como off

### Configurações do projeto 🖥️

---

<b>Passo 1:
Importação</b>

- 📁 Clone o projeto <a href="">cron-auto-ide</a>

<b>Passo 2: Configuração</b>

- ▶ Abra o projeto cron-auto-ide no <a href="https://code.visualstudio.com/Download">VsCode</a>, execute o comando `npm i` no terminal.
- ⚙️ No arquivo <a href="./tests/config/ide.json">IDE</a> você pode atualizar qual será a IDE e a quantidade de memória utilizada.
- ⚙️ No arquivo <a href="./tests/config/project.json">Project</a> você poderá alterar o nome do projeto que será criado no cronapp para testar as funcionalidades.
- ⚙️ Configure as variaveis de ambientes `EMAIL` e `PASSWORD` com os dados de acesso a IDE. <i> Obs: execute o Vscode como administrado após adicionar as variaies para ter acesso<i>

<b>Passo 4: Tipos de Execuções</b>

- ⚠️ <b>Obs.:</b> Não é necessário criar um projeto inicial para cada execução. <b>Apenas crie caso esteja executando as Specs <a href="./tests/e2e/ide/"> IDE</a></b><br>

▶️ Comando para rodar todas as spec

```
npx playwright test
```

▶️ Comando para rodar o Playwright via interface

```
npx playwright test --ui
```

▶️ Comando para rodar o Playwright no debug

```
npx playwright test --debug
```

▶️ Comando para rodar uma spec da regressão - ⚠️( Leia o <a href="/tests/e2e/regressions/">readme</a> da regressão que deseja executar )

```
npx playwright test tests/e2e/regressions/3.1.0
```

▶️ Comando para rodar spec de criação de <a href="./tests/e2e/project/"> projetos</a>

```
npx playwright test tests/e2e/project
```

▶️ Comando para rodar spec de testes das funcionalidades da <a href="./tests/e2e/ide/"> ide</a>

```
npx playwright test tests/e2e/ide
```


Autores:
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gilberto-blue?logo=linkedin)](https://www.linkedin.com/in/gilberto-amorim-a5875656/)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Leandro-blue?logo=linkedin)](linkedin.com/in/leandro-assarice/)

 
