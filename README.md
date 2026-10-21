# Quiz dos Pequenos Grandes Gênios – Pré-escolar II (5 a 6 anos)

Projeto de curricularização UNIFEBE × Prefeitura de Brusque.

## Estrutura do projeto

```
QuizEscolas/
├── server.js          ← servidor Node.js (sem dependências)
├── tentativas.txt     ← gerado automaticamente ao rodar
├── LEIAME.md
└── public/            ← tudo que o navegador acessa
    ├── index.html     ← jogo completo
    ├── questoes.js    ← banco de perguntas 
    └── img/
        ├── bg-inicio.jpg      ← fundo: sala 3D robô azul + teclado
        ├── bg-nivel.jpg       ← fundo: mesmo da tela inicial
        ├── bg-resultado.jpg   ← fundo: sala pôr do sol + círculo branco
        ├── bg-perguntas.jpg   ← fundo: céu azul com animais
        ├── robo-inicio.png    ← robô segurando bolinha azul
        └── robo-resultado.png ← robô branco segurando gráfico
```

> **Atenção:** O arquivo servido pelo navegador é **`public/index.html`**.
> Não edite arquivos fora da pasta `public/` para alterar o jogo.

---

## Como rodar (Windows ou Linux)

1. Instale o **Node.js 16 ou mais novo**: https://nodejs.org
2. Abra o terminal na pasta do projeto e execute:
   ```
   node server.js
   ```
3. Abra no navegador (Chrome, Firefox ou Edge):
   ```
   http://localhost:3000
   ```

O servidor **não precisa de `npm install`** — não há dependências externas.

---

## Imagens necessárias

Salve os arquivos de imagem em `public/img/` com os nomes exatos listados
na estrutura acima. Sem essas imagens o jogo funciona, mas os fundos
e o mascote não aparecem.

---

## Registro das tentativas

Cada resposta (acerto ou erro) é gravada em `tentativas.txt` na raiz do projeto:

```
ID|Nome|Data|Hora|Nivel|Area|Habilidade|Pergunta|Resultado
1|Ana|20/10/2026|14:32:01|Fácil|Sons e Sílabas|Rima|Qual rima com GATO?|ACERTO
```

**Se o servidor estiver fora do ar**, o jogo continua funcionando e, ao final,
exibe o botão **"💾 Baixar registro (.txt)"** para salvar as respostas localmente.

### Privacidade (LGPD)
- O nome digitado é usado apenas para identificar as respostas na sessão.
- `tentativas.txt` fica na máquina onde o servidor roda — não é enviado a terceiros.
- Recomenda-se apagar ou anonimizar o arquivo após cada aplicação.

---

## Editar perguntas

Arquivo: `public/questoes.js`

Formato de cada questão:
```js
['área', 'habilidade', 'enunciado', ['opção0','opção1','opção2'], índice_da_correta]
```

Áreas disponíveis: `S` Sons e Sílabas · `E` Noções de Espaço · `M` Matemática Simples · `P` Percepção Visual e Sensorial

### Quantidade atual de perguntas por nível

| Nível   | Qtd |
|---------|-----|
| Fácil   | 29  |
| Médio   | 22  |
| Difícil | 23  |

---

## Observações

- O áudio usa a voz do navegador (TTS em pt-BR). No Linux pode ser necessário
  instalar uma voz em português: `sudo apt install speech-dispatcher-espeak-ng`
- Testado em Node.js 16–24, Chrome 110+, Firefox 110+, Edge 110+.
- Para uso em rede local, outros computadores acessam via
  `http://<IP-da-máquina>:3000` (substitua pelo IP real).
