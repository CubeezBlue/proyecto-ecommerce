const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

// Cargar .env si existe
try { require('dotenv').config(); } catch (_) {}

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN || 'TEST-REEMPLAZA-CON-TU-ACCESS-TOKEN',
});

app.post('/create_preference', async (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío' });
    }

    try {
        const preference = await mercadopago.preferences.create({
            items: items.map(item => ({
                title: item.nombre,
                quantity: Number(item.cantidad),
                unit_price: Number(item.precio),
                currency_id: 'ARS',
            })),
            back_urls: {
                success: 'http://localhost:3000/pago-exitoso',
                failure: 'http://localhost:3000/pago-fallido',
                pending: 'http://localhost:3000/pago-pendiente',
            },
            auto_return: 'approved',
        });

        res.json({ init_point: preference.body.init_point });
    } catch (err) {
        console.error('Error MP:', err);
        res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    }
});

app.get('/pago-exitoso', (_req, res) => {
    res.redirect('http://127.0.0.1:5500/pages/pago-exitoso.html');
});
app.get('/pago-fallido', (_req, res) => {
    res.redirect('http://127.0.0.1:5500/pages/pago-fallido.html');
});
app.get('/pago-pendiente', (_req, res) => {
    res.redirect('http://127.0.0.1:5500/pages/pago-pendiente.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
