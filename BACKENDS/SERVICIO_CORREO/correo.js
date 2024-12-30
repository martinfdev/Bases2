const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const app = express();
const CORREO_PORT = process.env.CORREO_PORT || 5006;


app.use(express.json());


app.post("/send-email", async (req, res) => {
    const { to,nombre,fecha_vencimiento } = req.body;
    if (!to) {
        return res.status(400).json({ error: "El campo 'to' es requerido." });
    }
    if (!nombre) {
        return res.status(400).json({ error: "El campo 'nombre' es requerido." });
    }
    if (!fecha_vencimiento) {
        return res.status(400).json({ error: "El campo 'fecha_vencimiento' es requerido." });
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio de Pago</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #eaeaea;
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
        }
        .email-body p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .email-body a {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .email-body a:hover {
            background-color: #0056b3;
        }
        .email-footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Recordatorio de Pago</h1>
        </div>
        <div class="email-body">
            <p>Estimado/a: <strong>${nombre}</strong>,</p>
            <p>Le recordamos que debe realizar el pago de su colegiado para mantener activa su membresía y continuar ejerciendo en el hospital.</p>
            <p>Por favor, asegúrese de completar el pago antes del <strong>${fecha_vencimiento}</strong> para evitar interrupciones en su actividad profesional.</p>
            <a href="https://pago.colegiado.com">Realizar Pago</a>
            <p>Si ya realizó el pago, por favor ignore este mensaje.</p>
            <p>Atentamente,</p>
            <p><strong>Administración del Hospital</strong></p>
        </div>
        <div class="email-footer">
            <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
            <p>&copy; 2024 Administración del Hospital</p>
        </div>
    </div>
</body>
</html>`;
        const info = await transporter.sendMail({
            from: `"Administración del Hospital" <${process.env.MAILTRAP_FROM}>`, 
            to,
            subject: "Recordatorio de Pago del Colegiado",
            html: htmlContent, 
        });

        res.status(200).json({
            message: "Correo enviado exitosamente.",
            info,
        });
    } catch (error) {
        console.error("Error enviando el correo:", error);
        res.status(500).json({ error: "No se pudo enviar el correo." });
    }
});

app.listen(CORREO_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${CORREO_PORT}`);
});
