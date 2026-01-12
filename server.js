const express = require('express');
const { sequelize, Product, Stock, Purchase } = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HALAMAN UTAMA
app.get('/', async (req, res) => {
    const products = await Product.findAll({ include: Stock });
    
    const purchases = await Purchase.findAll({
        include: Product,
        order: [['createdAt', 'DESC']]
    });

    res.render('index', { products, purchases });
});

// LOGIKA BELI PRODUK
app.post('/buy', async (req, res) => {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity);

    try {
        await sequelize.transaction(async (t) => {
            const stock = await Stock.findOne({ where: { ProductId: productId }, lock: t });
            const product = await Product.findByPk(productId, { transaction: t });

            if (stock.amount < qty) throw new Error('Stok tidak mencukupi');
            
            stock.amount -= qty;
            await stock.save({ transaction: t });

            await Purchase.create({
                ProductId: productId,
                quantity: qty,
                totalPrice: product.price * qty,
                status: 'completed'
            }, { transaction: t });
        });
        res.redirect('/');
    } catch (error) {
        res.send(`<script>alert("${error.message}"); window.location.href="/";</script>`);
    }
});

// LOGIKA CANCEL PEMBELIAN
app.post('/cancel/:id', async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const purchase = await Purchase.findByPk(req.params.id, { transaction: t });
            
            if (purchase.status === 'cancelled') return;

            const stock = await Stock.findOne({ where: { ProductId: purchase.ProductId }, transaction: t });
            stock.amount += purchase.quantity;
            await stock.save({ transaction: t });

            purchase.status = 'cancelled';
            await purchase.save({ transaction: t });
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));