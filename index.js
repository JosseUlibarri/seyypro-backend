import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, price } = req.body;

      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items: [
            {
              title,
              quantity: 1,
              unit_price: Number(price),
              currency_id: "MXN"
            }
          ],
          back_urls: {
            success: "https://seyypro.com.mx",
            failure: "https://seyypro.com.mx",
            pending: "https://seyypro.com.mx"
          },
          auto_return: "approved"
        }
      });

      return res.status(200).json({
        init_point: result.init_point
      });

    } catch (error) {
      return res.status(500).json({
        error: "Error creando pago"
      });
    }
  }

  return res.status(200).json({ ok: true });
}