const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require('moment');
const Pagamento = require("./models/Pagamento");

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/pagamentos', function (req, res) {
    Pagamento.findAll().then(function (pagamentos) {
        res.render('pagamentos', {pagamentos: pagamentos})
    }).catch(function (erro) {
        res.send("Erro: Os pagamentos não puderam ser listados: " + erro);
    })
    
});

app.get('/cad-pagamento', function (req, res) {
    res.render('cad-pagamento');
});

app.post('/add-pagamento', function (req, res) {
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function () {
        res.redirect('/pagamentos');
    }).catch(function (erro) {
        res.send("Erro: O pagamento não pôde ser cadastrado: " + erro);
    })
   // res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor); //Listar Pagamentos
});

app.get('/del-pagamento/:id', function (req, res) {
    Pagamento.destroy({
        where: { 'id': req.params.id }
    }).then(function () {
        res.redirect('/pagamentos');
        //res.send("Pagamento removido com sucesso");
    }).catch(function (erro) {
        res.send("Erro: O pagamento não pôde ser removido: " + erro);
    })
   // res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor); //Listar Pagamentos
});

//Conexão com BD MySQL
// const mysql = require('mysql');

//Conexão com Mysql
// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'eliseu',
//     password : '123456',
//     database : 'eliseu_node'
// });
  
// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
// });

//SELECIONA DADOS DA TABELA users
// connection.query('SELECT * FROM users', function(err, rows, fields){
//     if(!err){
//         console.log('Resultado: ', rows);
//     }else{
//         console.log('Erro ao realizar a consulta');
//     }
// })

//INSERE DADOS NA TABELA users
// connection.query("INSERT INTO users (nome, email) VALUES ('Teste', 'testebueno@gmail.com')", function(err, rows, fields){
//     if(!err){
//         console.log('Usuário inserido com sucesso');
//     }else{
//         console.log('Erro ao realizar a inserção');
//     }
// })

//UPDATE EM DADOS DA TABELA users
// connection.query("UPDATE users SET email = 'eliseubueno@gmail.com' WHERE id_user = 1", function(err, rows, fields){
//     if(!err){
//         console.log('Registro Atualizado com sucesso');
//     }else{
//         console.log('Erro ao realizar a atualização');
//     }
// })

//DELETE DADOS DA TABELA users
// connection.query("DELETE FROM users WHERE id_user = 4", function(err, rows, fields){
//     if(!err){
//         console.log('Registro excluído com sucesso');
//     }else{
//         console.log('Erro ao realizar a exclusão');
//     }
// })

//ROTAS
// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/src/index.html");
// });

// app.get("/sobre-empresa", function (req, res) {
//     res.sendFile(__dirname + "/src/sobre-empresa.html");
// });

// app.get("/blog", function (req, res) {
//     res.send("Pagina do Blog Principal");
// });

// app.get("/contato", function (req, res) {
//     res.send("Pagina de Contato");
// });

//INDICA PORTA QUE SERÁ USADA
app.listen(8080);