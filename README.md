# Proposta — Adentare Infinity Clinic

Nova versão da página da Adentare Infinity Clinic (Vila da Penha e Barra da Tijuca, RJ), reorganizada a partir do conteúdo real do site atual (adentare.com): especialidades, textos, avaliações do Google, unidades e WhatsApp — com o nome de marca correto (o site atual mistura "Ateliê Do Dente" com "Adentare" por causa de uma migração incompleta).

Link publicado: https://rodrigosilvatcc.com/proposta-adentare/

## Estrutura

- `site/` — HTML/CSS/JS estático, pronto para deploy (é isto que sobe no servidor)
- `assets/` — imagens originais baixadas do site atual, usadas como fonte
- `optimize.js` — script Node (usa `sharp`) que gera as versões `.webp` otimizadas em `assets/opt/`, copiadas manualmente para `site/img/`

## Rodando localmente

```bash
npm install
node optimize.js   # gera assets/opt/*.webp (se precisar reprocessar as imagens)
npx serve site      # serve o site em http://localhost:3000
```

## Deploy

O deploy para a hospedagem (Hostinger, via FTP) é feito por um script separado em `../deploy/deploy.js`:

```bash
node ../deploy/deploy.js site proposta-adentare
```
