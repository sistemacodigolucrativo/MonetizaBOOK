const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar o Express para confiar no proxy do AI Studio
app.set('trust proxy', true);

// Prevenir cache agressivo que pode causar tela cinza/branca ao recarregar o iframe
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Servir arquivos estáticos sem redirecionamentos automáticos que podem quebrar no proxy
app.use(express.static(__dirname, {
  redirect: false, // Evita redirecionar /pasta para /pasta/ com a porta errada
  index: ['index.html']
}));

// Fallback manual para diretórios caso o redirect seja falso e o usuário acesse sem a barra final
app.use((req, res, next) => {
  if (req.path.endsWith('/')) {
    return res.sendFile(path.join(__dirname, req.path, 'index.html'));
  }
  
  // Tentar servir o index.html da pasta se ela existir
  res.sendFile(path.join(__dirname, req.path, 'index.html'), (err) => {
    if (err) {
      // Se não for um diretório válido com index.html, passar para o 404
      next();
    }
  });
});

// Tratamento de Erro 404
app.use((req, res) => {
  res.status(404).send('Página não encontrada.');
});

// Evitar crash do servidor caso ocorra algum erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
