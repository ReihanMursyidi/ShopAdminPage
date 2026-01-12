const { sequelize, Product, Stock } = require('./database');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        
        const products = [
            { name: 'Mechanical Keyboard', price: 1500000, img: 'images/keyboard.jpg' },
            { name: 'Gaming Mouse Wireless', price: 500000, img: 'images/mouse.jpg' },
            { name: 'UltraWide Monitor 34"', price: 4500000, img: 'images/monitor.jpg' },
            { name: 'Headset Gaming RGB', price: 750000, img: 'images/headphone.jpg' },
            { name: 'Deskmat / Mousepad XL', price: 150000, img: 'images/mousepad.webp' },
            { name: 'Streaming Webcam 4K', price: 1200000, img: 'images/webcam.webp' },
            { name: 'Condenser Microphone', price: 900000, img: 'images/condenser.jpg' },
            { name: 'Thunderbolt USB Hub', price: 850000, img: 'images/usb-hub.webp' },
            { name: 'Aluminum Laptop Stand', price: 300000, img: 'images/laptop-stand.webp' },
            { name: 'Ergo Gaming Chair', price: 3500000, img: 'images/kursi-gaming.webp' }
        ];

        for (const p of products) {
            const prod = await Product.create({
                name: p.name,
                price: p.price,
                imageUrl: p.img
            });
            await Stock.create({
                ProductId: prod.id,
                amount: Math.floor(Math.random() * 15) + 5
            });
        }
        console.log('10 Produk berhasil');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await sequelize.close();
    }
}

seed();