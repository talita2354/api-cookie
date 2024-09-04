const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());

//  Criar Cookie
app.post('/cookie/criar', (req, res) => {
    // esse maxaage:900000 são milisegundos
    res.cookie('meu_cookie', 'valor_inicial', { maxAge: 900000, httpOnly: true });
    res.status(201).json({
        mensagem: "cookie criado com sucesso",
        cod_status: 201
    });
});

// 2 - Ler Cookie
app.get('/cookie/ler', (req, res) => {
    const cookieNome = 'meu_cookie';
    const cookieValor = req.cookies[cookieNome];

    if (cookieValor) {
        res.status(200).json({
            mensagem: `o nome do cookie criado foi ${cookieNome} e valor ${cookieValor}`,
            cod_status: 200
        });
    } else {
        res.status(404).json({
            mensagem: "nenhum cookie encontrado",
            cod_status: 404
        });
    }
});

// 3 - Atualizar Cookie
app.put('/cookie/atualizar', (req, res) => {
    const novoValor = req.body.valor || 'novo_valor';
    res.cookie('meu_cookie', novoValor, { maxAge: 900000, httpOnly: true });
    res.status(201).json({
        mensagem: `o novo nome do cookie é meu_cookie e o novo valor é ${novoValor}`,
        cod_status: 201
    });
});

// 4 - Excluir Cookie
app.delete('/cookie/excluir', (req, res) => {
    res.clearCookie('meu_cookie');
    res.status(201).json({
        mensagem: "cookie excluído com sucesso",
        cod_status: 201
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
