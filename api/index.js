import database from './src/config/db.js';
import Produto from './produto.js';

(async () => {
    await database.sync();

    // ---------- CRIAR PRODUTOS -------------------

    // const novoProduto = await Produto.create({
    //     nome: 'Mouse USB',
    //     senha: '123'
    // })
    // console.log(novoProduto);

    // -------------- BUSCAR TODOS -------------------------

    const produtos = await Produto.findAll()
    console.log(produtos);

    // -------------- BUSCAR TODOS INLINE -------------------------

    // const produtos = await Produto.findAll({
    //     where: {
    //         nome: 'Teclado USB'
    //     }
    // })
    // console.log(produtos);

    // ------------------ BUSCAR POR ID ----------------

    // const produto = await Produto.findByPk(1);
    // console.log(produto);

// --------------------- ATUALIZAR -------------------

    // const produto = await Produto.findByPk(1);
    // console.log(produto);

    // produto.nome = 'Teclado USB';
    // await produto.save();

    // --------------- DELETE --------------------

    // const produto = await Produto.findByPk(1);
    // console.log(produto);

    // await produto.destroy();

    // ------------- DELETE INLINE ---------------

    // await Produto.destroy({ where: {
    //     nome: 'Teclado USB'
    // }})

}) ();