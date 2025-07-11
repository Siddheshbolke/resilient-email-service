const express = require('express');
const EmailService = require('./src/services/EmailService');

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.post('/send', async (req, res) => {
    const { to, subject, body, messageId } = req.body;
    if (!to || !subject || !body) {
        return res.status(400).json({ error: "Missing required fields: to, subject, body" });
    }
    const result = await emailService.sendEmail({ to, subject, body }, messageId);
    res.json(result);
});

app.get('/status/:id', (req, res) => {
    const status = emailService.getStatus(req.params.id);
    res.json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Email service API running at http://localhost:${PORT}`));
