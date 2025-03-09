/*

    🧃𝐛𝐨𝐭 𝐧𝐚𝐦𝐞
    
    𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐌𝐃-𝐁𝐎𝐓
    
    🧃𝐛𝐨𝐭 𝐨𝐰𝐧𝐞𝐫
    
    𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐌𝐃-𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲
    
    🧃𝐝𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫
    
    𝐦𝐯𝐞𝐥𝐚𝐬𝐞-𝐭𝐞𝐜𝐡𝐠𝐮𝐲
    
    🧃𝐥𝐨𝐜𝐚𝐭𝐢𝐨𝐧
    
    𝐛𝐮𝐥𝐚𝐰𝐚𝐲𝐨.𝐳𝐢𝐦𝐛𝐚𝐛𝐰𝐞
    
    🧃𝐫𝐞𝐚𝐥 𝐧𝐚𝐦𝐞 
    
    𝐤𝐡𝐮𝐞𝐥𝐚𝐤𝐚𝐧𝐢 𝐦𝐯𝐞𝐥𝐚𝐬𝐞

© 𝐓𝐑𝐘 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐍𝐆 𝐈𝐅 𝐘𝐎𝐔 𝐂𝐀𝐍....𝐛𝐲 𝐦𝐯𝐞𝐥𝐚𝐬𝐞 𝐭𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲

*/

const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');



cmd({
  pattern: 'version',
  react: '✔️',
  desc: 'Check the bot\'s version',
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    const packageName = require('../package.json');
    const currentVersion = packageName.version;

    const apiUrl = 'https://raw.githubusercontent.com/KHULEKANI702/MVELASE-MD-BOT/master/package.json';
    const response = await axios.get(apiUrl);
    const data = response.data;
    const latestVersion = data.version;

    let message = '';
    if (currentVersion === latestVersion) {
      message = `*𝖬𝗏𝖾𝗅𝖺𝗌𝖾 𝖬𝖣 𝖻𝗈𝗍 𝗂𝗌 𝗎𝗉-𝗍𝗈-𝖽𝖺𝗍𝖾! ⚙️n Current version is: ${currentVersion}*`;
    } else {
      message = `*𝖬𝗏𝖾𝗅𝖺𝗌𝖾 𝖬𝖣 𝖻𝗈𝗍 𝗂𝗌 𝗈𝗎𝗍-𝖽𝖺𝗍𝖾𝖽! ⚙️!\n\n  Current version: ${currentVersion} \n Latest version: ${latestVersion}*`;
    }

   // await reply(message);
    
 // } catch (error) {
  //  console.error('Error fetching version:', error);
   // await reply('Error fetching version. Please try again later.');
//  }
//});
       // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/8ub6ps.png` },  // Image URL
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411325763461@newsletter',
                    newsletterName: 'ᴍᴠᴇʟᴀsᴇ-ᴍᴅ-ʙᴏᴛ ᴛᴇᴄʜɴᴏʟᴏɢʏ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in Mvelase checking Version:", e);
        reply(`An error Occured Fetching Version 😕`);
    }
});
