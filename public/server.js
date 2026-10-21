// Servidor simples (sem dependências) – Node 16+
// Serve o jogo e grava as tentativas em tentativas.txt (ID auto incremento).
const http = require('http'), fs = require('fs'), path = require('path');
const PORTA = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const ARQ = path.join(__dirname, 'tentativas.txt');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };

function proximoId() {
  if (!fs.existsSync(ARQ)) return 1;
  const linhas = fs.readFileSync(ARQ, 'utf8').split('\n').filter(l => l.trim() && !l.startsWith('ID|'));
  return linhas.length + 1;
}
const limpa = s => String(s ?? '').replace(/[|\r\n]/g, ' ').trim();

http.createServer((req, res) => {
  // Cabeçalhos de segurança em todas as respostas
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (req.method === 'POST' && req.url === '/api/tentativa') {
    let corpo = '';
    req.on('data', c => {
      corpo += c;
      if (corpo.length > 10000) { res.writeHead(413).end('payload muito grande'); return; }
    });
    req.on('end', () => {
      if (res.writableEnded) return; // já encerrou por excesso de tamanho
      try {
        const t = JSON.parse(corpo), agora = new Date();
        if (!fs.existsSync(ARQ)) fs.writeFileSync(ARQ, 'ID|Nome|Data|Hora|Nivel|Area|Habilidade|Pergunta|Resultado\n');
        const linha = [proximoId(), limpa(t.nome), agora.toLocaleDateString('pt-BR'), agora.toLocaleTimeString('pt-BR'),
        limpa(t.nivel), limpa(t.area), limpa(t.habilidade), limpa(t.pergunta), t.acertou ? 'ACERTO' : 'ERRO'].join('|');
        fs.appendFileSync(ARQ, linha + '\n');
        res.writeHead(200).end('ok');
      } catch (e) { res.writeHead(400).end('erro'); }
    });
    return;
  }
  const rota = req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0];
  const arq = path.join(PUBLIC, path.normalize(rota));
  if (!arq.startsWith(PUBLIC) || !fs.existsSync(arq)) return res.writeHead(404).end('Não encontrado');
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
  fs.createReadStream(arq).pipe(res);
}).listen(PORTA, () => console.log(`Jogo em http://localhost:${PORTA}  |  tentativas em ${ARQ}`));
