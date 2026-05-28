const axios = require('axios');

async function sendTelegramMessageLogin(message) {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.log("Telegram login config missing");
            return;
        }

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        await axios.post(url, {
            chat_id: chatId,
            text: message
        });

    } catch (err) {
        console.log("Login Telegram failed:", err.response?.data || err.message);
    }
}

async function sendTelegramMessage(message) {
    try {
        const token = process.env.TELEGRAM_MESSAGE_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_MESSAGE_ID;

        if (!token || !chatId) {
            console.log("Telegram message config missing");
            return;
        }

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        await axios.post(url, {
            chat_id: chatId,
            text: message
        });

    } catch (err) {
        console.log("Message Telegram failed:", err.response?.data || err.message);
    }
}

module.exports = { sendTelegramMessageLogin, sendTelegramMessage };
