const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok2",
    alias: ["tt2", "tiktokdl2", "ttdown2", "tiktokvid2", "ttdl2"],    desc: "Download TikTok videos or audio by link.",
    category: "downloader",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { args, reply, isQuoted }) => {
    try {
        if (!args[0]) return reply("❌ Please provide a TikTok video link.");

        const apiURL = `https://apii.ambalzz.biz.id/api/downloader/tiktokdl?url=${encodeURIComponent(args[0])}`;
        const { data } = await axios.get(apiURL);

        if (data.status !== 0) return reply("❌ Failed to fetch video. Try another link.");

        const videoData = data.data;
        const videoStats = data.video_view;
        const author = data.author;

        let captionMessage = `🎵 *TikTok Video Found!*\n\n`;
        captionMessage += `📌 *Caption:* ${videoData.caption_vid || "No caption"}\n`;
        captionMessage += `👀 *Views:* ${videoStats.views}\n`;
        captionMessage += `❤️ *Likes:* ${videoStats.likes}\n`;
        captionMessage += `💬 *Comments:* ${videoStats.comments}\n`;
        captionMessage += `🔁 *Shares:* ${videoStats.shares}\n`;
        captionMessage += `👤 *Author:* ${author.nickname} (@${author.username})\n`;
        captionMessage += `\n🔹 *Reply with:* \n 1️⃣ for *Video* 📽️ \n 2️⃣ for *Audio* 🎵`;

        // Send the message with TikTok thumbnail and context info
        const sentMessage = await conn.sendMessage(m.chat, {
            image: { url: author.profile },
            caption: captionMessage,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363334594240793@newsletter',
                    newsletterName: "Mvelase Technology",
                    serverMessageId: 143
                }
            }
        });

        const messageID = sentMessage.key.id;

        // Listen for user response
        conn.ev.on("messages.upsert", async message => {
            const receivedMessage = message.messages[0];
            if (!receivedMessage.message) return;

            const userResponse = receivedMessage.message.conversation || 
                                 receivedMessage.message.extendedTextMessage?.["text"];
            const chatID = receivedMessage.key.remoteJid;
            const isReplyToBotMessage = receivedMessage.message.extendedTextMessage &&
                                        receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToBotMessage) {
                await conn.sendMessage(chatID, {
                    react: { text: "⬇️", key: receivedMessage.key }
                });

                if (userResponse === "1") {
                    await conn.sendMessage(chatID, {
                        video: { url: videoData.video },
                        caption: "*Powered By Mvelase Technology"
                    }, { quoted: receivedMessage });
                } else if (userResponse === "2") {
                    await conn.sendMessage(chatID, {
                        audio: { url: videoData.music },
                        mimetype: "audio/mp4",
                        ptt: false 
                    }, { quoted: receivedMessage });
                } else {
                    reply("❌ Invalid choice! Reply with *1* for video or *2* for audio.");
                }

                await conn.sendMessage(chatID, {
                    react: { text: "⬆️", key: receivedMessage.key }
                });
            }
        });

    } catch (error) {
        console.error("TikTok Downloader Error:", error);
        reply("❌ Error fetching TikTok video. Try again later.");
    }
}); 
