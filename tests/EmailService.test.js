const EmailService = require('../src/services/EmailService');

test('Email sending succeeds or fails gracefully', async () => {
    const service = new EmailService();
    const res = await service.sendEmail({ to: 'test@example.com', subject: 'Hello', body: 'World' });
    expect(res).toHaveProperty('success');
});
