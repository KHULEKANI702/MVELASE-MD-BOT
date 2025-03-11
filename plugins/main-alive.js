const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `╭─┈┉┈⟮ *𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐌𝐃-𝐁𝐎𝐓* ⟯┈┉┈⊷
┃⛮╭─────────────☉
┃⛮┃• *⏳ 𝐁𝐎𝐓-𝐔𝐏𝐓𝐈𝐌𝐄* :  *${runtime(process.uptime())}* 
┃⛮┃• *📟 𝐑𝐀𝐌-𝐔𝐒𝐀𝐆𝐄* : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐌𝐁 / ${(os.totalmem() / 1024 / 1024).toFixed(2)}𝐌𝐁*
┃⛮┃• *⚙️ 𝐇𝐎𝐒𝐓-𝐍𝐀𝐌𝐄* : *${os.hostname()}*
┃⛮┃• *👨‍💻 𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑* : *𝐌𝐕𝐄𝐋𝐀𝐒𝐄 𝐓𝐄𝐂𝐇𝐍𝐎𝐋𝐎𝐆𝐘*
┃⛮┃• *🏷 𝐁𝐎𝐓-𝐕𝐄𝐑𝐒𝐈𝐎𝐍* : *3.0.0*
┃⛮└───────────┈⊷
╰──────────────┈⊷

>𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐌𝐃-𝐁𝐎𝐓 𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/8ub6ps.png` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363334594240793@newsletter',
                    newsletterName: '𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐌𝐃-𝐁𝐎𝐓🍁',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
