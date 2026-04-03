# Menina dos Olhos – Sistema de Gestão de Dados

## 📁 Estructura de Arquivos

```
MENINA DOS OLHOS/
├── index.html          # Arquivo principal (HTML + CSS + Scripts)
├── app.js              # Script que carrega dados.json e popula o HTML
├── dados.json          # Arquivo com todos os dados (empresa, produtos, depoimentos, etc)
│
├── imagens/            # CRIAR PASTA - Adicionar imagens aqui
│   ├── 14.jpeg         (Óculos de Grau)
│   ├── 009.jpeg        (Óculos Solar - destaque)
│   ├── 0002.jpeg       (Armações)
│   ├── 001.jpeg        (Classic Brown)
│   └── 002.jpeg        (Slim Urban)
│
└── videos/             # CRIAR PASTA - Adicionar vídeos aqui
    └── VIDEO.mp4       (Óculos Solar Bold Premium)
```

## 🚀 Como Funciona

### 1. Carregamento de Dados
- `app.js` carrega automaticamente `dados.json` quando a página carrega
- Os dados são injetados no HTML dinamicamente
- Sem necessidade de editar o HTML manualmente

### 2. Estrutura de dados.json

**Empresa**: Informações de contato, endereço, horário
```json
"empresa": {
  "nome": "Menina dos Olhos Ótica",
  "telefone": "+553183623050",
  "endereco": { ... }
}
```

**Categorias**: 3 categorias de produtos
```json
"categorias": [
  {
    "nome": "Óculos de Grau",
    "imagem": "14.jpeg",
    "destaque": false
  }
]
```

**Produtos**: Vitrine de produtos
```json
"produtos": [
  {
    "nome": "Classic Brown",
    "categoria": "Óculos de Sol",
    "imagem": "001.jpeg",
    "whatsapp_mensagem": "..."
  }
]
```

**Depoimentos**: Avaliações de clientes
```json
"depoimentos": [
  {
    "autor": "Eduardo Moreira",
    "avaliacao": 5,
    "texto": "..."
  }
]
```

**FAQ**: Perguntas frequentes
```json
"faq": [
  {
    "pergunta": "...",
    "resposta": "..."
  }
]
```

## 📝 Como Editar Dados

### Editar Empresa
Abra `dados.json` e modifique a seção "empresa":
```json
"empresa": {
  "nome": "Novo Nome",
  "telefone": "+55 novo número",
  "endereco": {
    "rua": "Nova Rua",
    "numero": 123
  }
}
```

### Adicionar Novo Produto
Adicione um objeto à array "produtos":
```json
"produtos": [
  {
    "id": 4,
    "nome": "Novo Modelo",
    "categoria": "Óculos solar",
    "descricao": "Descrição do produto",
    "imagem": "nova_img.jpeg",
    "tipo_media": "imagem",
    "promocao": true,
    "promocao_texto": "🔥 Promoção",
    "whatsapp_mensagem": "Olá! Vi o modelo..."
  }
]
```

### Adicionar Novo Depoimento
```json
"depoimentos": [
  {
    "id": 4,
    "avaliacao": 5,
    "texto": "Novo depoimento...",
    "autor": "Novo Cliente",
    "local": "Cidade, MG",
    "avatar": "av1"
  }
]
```

### Adicionar FAQ
```json
"faq": [
  {
    "id": 6,
    "pergunta": "Sua pergunta?",
    "resposta": "Sua resposta..."
  }
]
```

## 🖼️ Gerenciar Imagens

### Pasta de Imagens
1. Crie uma pasta `imagens/` no mesmo nível do `index.html`
2. Coloque as imagens lá
3. Quando referenciar em `dados.json`, use o caminho relativo:
   ```json
   "imagem": "001.jpeg"  // Procura em imagens/001.jpeg
   ```

**Imagens necessárias:**
- `14.jpeg` – Óculos de Grau
- `009.jpeg` – Óculos Solar (destaque)
- `0002.jpeg` – Armações
- `001.jpeg` – Classic Brown
- `002.jpeg` – Slim Urban

### Vídeos
1. Crie uma pasta `videos/` 
2. Coloque o vídeo `VIDEO.mp4` lá
3. Em `dados.json`:
   ```json
   "imagem": "VIDEO.mp4",
   "tipo_media": "video"
   ```

## ⚙️ Funcionalidades do app.js

O arquivo `app.js` realiza as seguintes operações:

1. **loadData()** - Carrega dados.json
2. **renderProducts()** - Popula categorias
3. **renderProductShowcase()** - Popula vitrine de produtos
4. **renderDiferenciais()** - Popula diferenciais
5. **renderTestimonials()** - Popula depoimentos
6. **renderFAQ()** - Popula perguntas frequentes
7. **updateContactInfo()** - Atualiza endereço, telefone, horário
8. **updateCounters()** - Atualiza estatísticas (+500, 100+, 5★)

## 🔗 Links WhatsApp

Todos os links WhatsApp são automaticamente vinculados a partir de `dados.json`:

```json
"links_whatsapp": {
  "orcamento_header": "https://wa.me/553183623050?text=...",
  "catalogo_completo": "...",
  "cta_final": "...",
  "fab_fixo": "..."
}
```

Altere apenas o número em `"whatsapp": "553183623050"` na seção empresa e todos os links serão atualizados automaticamente.

## 🌐 Deploy

### Estrutura Final de Upload
```
www/
├── index.html
├── app.js
├── dados.json
├── imagens/
│   ├── 14.jpeg
│   ├── 009.jpeg
│   ├── 0002.jpeg
│   ├── 001.jpeg
│   └── 002.jpeg
└── videos/
    └── VIDEO.mp4
```

### Dicas
- Coloque tudo na mesma pasta
- O `app.js` carrega `dados.json` automaticamente
- As imagens devem estar na pasta `imagens/`
- Sem necessidade de servidor especial, funciona localmente e em hospedagem

## 🐛 Solução de Problemas

### Dados não aparecem
- Verifique se `dados.json` está na mesma pasta que `index.html`
- Abra o console (F12) e veja se há erros
- Certifique-se que o JSON é válido (use jsonlint.com)

### Imagens não carregam
- Verifique os nomes dos arquivos em `dados.json`
- Certifique-se que as imagens estão em uma pasta `imagens/`
- Use nomes sem espaços e caracteres especiais

### WhatsApp links não funcionam
- Verifique o número de telefone em `"whatsapp": "+553183623050"`
- Certifique-se que está usando `+55` antes do DDD

## 📞 Suporte

Referências de dados estruturados:
- **Empresa**: Contato, endereço, horário, redes sociais
- **Estatísticas**: Clientes, modelos, avaliação
- **Mídia**: Referências de imagens e vídeos

Tudo é gerenciado através do `dados.json` e renderizado dinamicamente pelo `app.js`.
