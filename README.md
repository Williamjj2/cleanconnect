# CleanConnect MVP

Plataforma para profissionais brasileiras de limpeza nos Estados Unidos.

## 🚀 Quick Start

1. Configure as variáveis de ambiente
```bash
# Edite .env.local com suas credenciais do Supabase, OpenAI, etc
```

2. Instale as dependências adicionais
```bash
npm install @supabase/ssr @hookform/resolvers react-hook-form zod
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot
npm install class-variance-authority clsx tailwind-merge
npm install date-fns react-day-picker
```

3. Configure o Supabase
- Crie um projeto em [supabase.com](https://supabase.com)
- Execute o schema SQL em `supabase/migrations/001_initial_schema.sql`
- Copie as chaves para `.env.local`

4. Inicie o desenvolvimento
```bash
npm run dev
```

## 📱 Features MVP

- ✅ Agenda inteligente com drag-and-drop
- ✅ IA para tradução e templates de mensagens
- ✅ Perfil público profissional
- ✅ Sistema de reviews
- ✅ PWA mobile-first

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-4
- **SMS**: Twilio
- **Payments**: Stripe

## 📊 Estrutura do Banco

Ver arquivo `supabase/migrations/001_initial_schema.sql`

## 🎯 Próximos Passos

1. [ ] Implementar autenticação
2. [ ] Criar componentes base
3. [ ] Desenvolver dashboard
4. [ ] Integrar OpenAI
5. [ ] Configurar PWA
