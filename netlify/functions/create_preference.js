const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let items;
    try {
        ({ items } = JSON.parse(event.body));
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Body inválido' }) };
    }

    if (!items || items.length === 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'El carrito está vacío' }) };
    }

    const siteUrl = process.env.URL || 'http://localhost:8888';

    try {
        const preference = await mercadopago.preferences.create({
            items: items.map(item => ({
                title: item.nombre,
                quantity: Number(item.cantidad),
                unit_price: Number(item.precio),
                currency_id: 'ARS',
            })),
            back_urls: {
                success: `${siteUrl}/pages/pago-exitoso.html`,
                failure: `${siteUrl}/pages/pago-fallido.html`,
                pending: `${siteUrl}/pages/pago-pendiente.html`,
            },
            auto_return: 'approved',
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_point: preference.body.init_point }),
        };
    } catch (err) {
        console.error('Error MP:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al crear la preferencia de pago' }),
        };
    }
};
