const BOT_TOKEN = '8318197368:AAFyH0JcBzwWso1RJJKCHOb720-xGzhE8H4';
const CHAT_ID = '8376441380';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

/**
 * Sends a formatted message to the Telegram chat.
 * @param {string} text - The message content.
 */
async function sendTelegramMessage(text) {
    const data = {
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.ok) {
            console.log('Telegram message sent successfully.');
        } else {
            console.error('Telegram API Error:', result.description);
        }
    } catch (error) {
        console.error('Error sending Telegram message:', error);
    }
}

/**
 * Formats and sends the complete checkout data to Telegram.
 * @param {object} checkoutInfo - The collected checkout data.
 */
function sendCheckoutNotification(checkoutInfo) {
    const message = `
<b>🎉 New Entry on La Maison! 🎉</b>
--------------------------------------
<b>Package:</b> ${checkoutInfo.package}
<b>Price:</b> $${checkoutInfo.price}
--------------------------------------
<b>Name:</b> ${checkoutInfo.firstName} ${checkoutInfo.lastName}
<b>Email:</b> ${checkoutInfo.email}
<b>Phone:</b> ${checkoutInfo.phone}
--------------------------------------
<b>Address:</b>
${checkoutInfo.address1}
${checkoutInfo.address2 ? checkoutInfo.address2 + '\n' : ''}${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.postalCode}
${checkoutInfo.country}
    `;
    sendTelegramMessage(message.trim());
}
