# pass.in — Web

Interface web do sistema **List of Participants**, uma aplicação para gestão de participantes em eventos presenciais.

## Sobre o projeto

O pass.in permite que organizadores cadastrem eventos e gerenciem a lista de participantes, incluindo o controle de check-in no dia do evento.

## Tecnologias

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Day.js](https://day.js.org/) — formatação de datas
- [Lucide React](https://lucide.dev/) — ícones
- [Faker.js](https://fakerjs.dev/) — geração de dados mockados

## Funcionalidades

- Listagem de participantes com paginação (10 por página)
- Busca por nome, e-mail ou código do participante
- Exibição da data de inscrição e data do check-in (relativa ao momento atual)
- Estado de check-in por participante
- Filtros e navegação persistidos na URL (query params)

## Pré-requisitos

- Node.js 18+
- npm ou pnpm

## Como rodar

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run start
```

A aplicação estará disponível em `http://localhost:5000`.

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o linter (ESLint) |

## Estrutura de pastas

```
src/
├── components/
│   ├── table/          # Componentes da tabela (Table, TableRow, etc.)
│   ├── attendee-list.tsx   # Lista de participantes com busca e paginação
│   ├── header.tsx          # Cabeçalho com navegação
│   ├── icon-button.tsx     # Botão de ícone reutilizável
│   └── nav-link.tsx        # Link de navegação
├── assets/             # Ícones e imagens estáticas
├── app.tsx             # Componente raiz
├── main.tsx            # Ponto de entrada da aplicação
└── index.css           # Estilos globais (Tailwind)
```

## Dados mockados

A aplicação utiliza dados gerados localmente com Faker.js, dispensando a necessidade de um backend para executar e explorar a interface. Para conectar a uma API real, basta substituir a lógica de mock em `src/components/attendee-list.tsx` por uma chamada ao endpoint desejado.

## Layout

O layout da aplicação segue um design escuro com destaque em tons de verde esmeralda, baseado no evento NLW Unite da Rocketseat.
