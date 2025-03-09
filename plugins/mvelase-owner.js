const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/8ub6ps.png' }, // Image URL from your request
            caption: `╭─━┉┈⟮ *𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐌𝐃-𝐁𝐎𝐓* ⟯─━┉┈⊷
┃⳺╭─────┉┈────┉┈☉
┃⳺┃ℹ️ *𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐌𝐃-𝐁𝐎𝐓 𝐃𝐄𝐓𝐀𝐈𝐋𝐒*
┃⳺┃🤖 *𝐨𝐰𝐧𝐞𝐫-𝐧𝐚𝐦𝐞* : *${ownerName}*
┃⳺┃🔖 *𝐨𝐰𝐧𝐞𝐫-𝐧𝐮𝐦𝐛𝐞𝐫* : *${ownerNumber}*
┃⳺┃🍁 *𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐛𝐨𝐭-𝐯𝐞𝐫𝐬𝐢𝐨𝐧* : *3.0.0*
┃⳺┗─────┉┈────┈⊷
╰───────┉┈─────┈⊷
> 𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐌𝐃-𝐁𝐎𝐓 𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411325763461@newsletter',
                    newsletterName: 'Mvelase Technology',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/contact.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
