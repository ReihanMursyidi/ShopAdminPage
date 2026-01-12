const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.sqlite',
    logging: false
});

const Product = sequelize.define('product', {
    name: { type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.INTEGER, allowNull: false},
    imageUrl: { type: DataTypes.STRING }
});

const Stock = sequelize.define('Stock', {
    amount: {type: DataTypes.INTEGER, defaultValue: 0 }
});

const Purchase = sequelize.define('Purchase', {
    status: {
        type: DataTypes.ENUM('completed', 'cancelled'),
        defaultValue: 'completed'
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false }
});

Product.hasOne(Stock, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
Stock.belongsTo(Product, { foreignKey: 'ProductId' });

Product.hasMany(Purchase, { foreignKey: 'ProductId' } );
Purchase.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = { sequelize, Product, Stock, Purchase };