//Conexão DB com Sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('eliseu_node', 'eliseu', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

// sequelize.authenticate().then(function () {
//     console.log('Conexão realizada com sucesso')
// }).catch(function (err) {
//     console.log('Erro ao realizar a conexão com o Banco de Dados' + err)
// })

//CONEXÃO COM TABELA pagamentos COM SEQUELIZE
// const Pagamento = sequelize.define('pagamentos', {
//     nome: {
//         type: Sequelize.STRING
//     },
//     valor: {
//         type: Sequelize.DOUBLE
//     }
// })

//CRIAÇÃO DE TABELA pagamentos COM SEQUELIZE
// Pagamento.sync({ force: true });

//INSERÇÃO DE DADOS COM SEQUELIZE
// Pagamento.create({
//     nome: "Energia",
//     valor: 220.80
// })