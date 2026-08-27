# Client Portal Pro

[![CI](https://github.com/Beckerr11/client-portal-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/Beckerr11/client-portal-pro/actions/workflows/ci.yml)

Portal full stack para organizar demandas de clientes com **React no frontend e Node.js/Express no backend**, incluindo validação, filtros, exportação CSV, testes e pipeline de CI.

**Demo pública:** https://client-portal-pro-sigma.vercel.app  
**Portfólio:** https://douglasdev.tech

> A demo pública na Vercel apresenta a experiência de frontend. O fluxo full stack completo é reproduzível localmente com o backend deste repositório.

## O que este projeto demonstra

- frontend React responsivo com estados de carregamento e erro;
- API Node.js/Express com validação de entrada via Zod;
- criação, atualização, remoção e consulta de demandas;
- filtros por status, prioridade e busca textual;
- persistência local em arquivo para manter o projeto simples e reproduzível;
- exportação CSV para análise operacional;
- testes separados de backend, frontend e portabilidade;
- lint, testes e build executados automaticamente no GitHub Actions.

## Fluxo principal

```text
Cliente / operador
      ↓
Frontend React
      ↓
API Node.js + Express
      ↓
Validação com Zod
      ↓
Persistência local
      ↓
Consulta · filtros · atualização · CSV
```

O objetivo é mostrar um fluxo de produto completo sem esconder o estado real da implementação: a persistência atual é local e não é apresentada como banco de dados externo.

## Endpoints principais

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `GET` | `/health` | health check da API |
| `GET` | `/api/meta` | metadados usados pela aplicação |
| `GET` | `/api/work-items` | lista e filtra demandas |
| `GET` | `/api/work-items/export.csv` | exporta demandas em CSV |
| `POST` | `/api/work-items` | cria uma demanda |
| `PATCH` | `/api/work-items/:id/toggle` | atualiza o estado de uma demanda |
| `DELETE` | `/api/work-items/:id` | remove uma demanda |

## Executando localmente

Requer Node.js compatível com o projeto e npm.

```bash
npm install --include=dev
npm run bootstrap
npm run dev
```

O script `bootstrap` instala as dependências de backend e frontend. O comando `dev` inicia os dois ambientes em paralelo.

## Qualidade

Para executar a validação completa localmente:

```bash
npm run quality
```

Esse comando executa:

1. lint do backend e frontend;
2. testes de portabilidade do repositório;
3. testes do backend;
4. testes do frontend;
5. build dos dois projetos.

O workflow de CI repete lint, testes e build em jobs separados para backend e frontend usando Node.js 24.

## Estrutura

```text
client-portal-pro/
├── backend/      # API Node.js / Express
├── frontend/     # aplicação React
├── tests/        # verificações de portabilidade
├── .github/      # CI
└── package.json  # scripts de orquestração
```

## Decisões de engenharia

- **Zod na entrada da API:** reduz estados inválidos e explicita o contrato recebido pelo backend.
- **Frontend e backend separados:** facilita testar, evoluir e executar cada camada de forma independente.
- **Persistência local deliberada:** mantém o projeto reproduzível sem exigir credenciais ou serviços externos.
- **CI por camada:** evita que uma alteração aparentemente isolada quebre silenciosamente outra parte da aplicação.

## Limites atuais

Este projeto não apresenta autenticação, banco externo, filas ou infraestrutura distribuída como recursos concluídos. O README descreve apenas funcionalidades verificáveis no código, nos testes e no CI atual.

## Autor

**Douglas Silva**  
[GitHub](https://github.com/Beckerr11) · [Portfólio](https://douglasdev.tech) · [LinkedIn](https://www.linkedin.com/in/douglassilva11)
