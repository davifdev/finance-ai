# Finance AI

Aplicação web para organizar finanças pessoais. Permite registrar movimentações, acompanhar resumos mensais e, no plano Premium, gerar relatórios financeiros com IA.

## Funcionalidades

- **Dashboard (`/`)**: resumo mensal do saldo, depósitos, despesas e investimentos; gráficos por tipo e categoria; lista das últimas transações.
- **Transações (`/transactions`)**: cadastro, edição, exclusão e consulta das movimentações do usuário.
- **Assinatura (`/subscription`)**: comparação entre os planos Básico e Premium e gerenciamento da assinatura.
- **Relatórios com IA**: análise das transações do mês selecionado, disponível no plano Premium.
- **Login e contas**: autenticação e gerenciamento de usuários com Clerk.

O plano Básico permite até 10 transações por mês. O plano Premium oferece transações ilimitadas e relatórios com IA.

## Tecnologias

- Next.js 14, React 18 e TypeScript
- Tailwind CSS e componentes Radix UI
- Clerk para autenticação
- PostgreSQL e Prisma para persistência de dados
- Stripe para pagamentos e assinaturas
- OpenAI para geração dos relatórios financeiros

## Requisitos

- Node.js e npm
- Banco de dados PostgreSQL
- Credenciais do Clerk
- Para os recursos Premium: contas/configurações da Stripe e uma chave da API da OpenAI

## Executar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente no arquivo `.env` (veja a seção abaixo).

3. Aplique as migrações do banco de dados:

   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Configure os nomes abaixo no `.env`, sem publicar valores secretos no repositório:

| Variável                             | Uso                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `DATABASE_URL`                       | Conexão com o PostgreSQL                                                    |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Chave pública do Clerk                                                      |
| `CLERK_SECRET_KEY`                   | Chave privada do Clerk                                                      |
| `OPENAI_API_KEY`                     | Geração dos relatórios com IA                                               |
| `STRIPE_SECRET_KEY`                  | Integração de pagamentos no servidor                                        |
| `STRIPE_WEBHOOK_SECRET`              | Validação dos eventos de webhook da Stripe                                  |
| `STRIPE_PREMIUM_PLAN_PRICE_ID`       | Identificador do preço do plano Premium                                     |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública da Stripe para o checkout                                     |
| `NEXT_PUBLIC_CUSTOMER_PORTAL_URL`    | URL do portal de gerenciamento de assinaturas                               |
| `APP_URL`                            | URLs de retorno após o checkout, conforme usadas atualmente pela integração |

Clerk, banco de dados, Stripe e OpenAI precisam estar configurados para usar os respectivos recursos. Os recursos de assinatura exigem também a configuração do webhook da Stripe em `/api/webhooks/stripe`.

## Comandos disponíveis

| Comando         | Descrição                                |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Inicia o ambiente de desenvolvimento     |
| `npm run build` | Gera a versão de produção                |
| `npm run start` | Inicia a versão de produção já compilada |
| `npm run lint`  | Executa o lint do Next.js                |

O modelo de dados principal é `Transaction`, com tipo, categoria, forma de pagamento, valor e data. Cada transação é associada ao usuário autenticado.
