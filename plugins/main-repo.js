const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "mrepo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/khulekanidube/MVELASE-MD-BOT';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*𝐇𝐄𝐋𝐋𝐎 𝐓𝐇𝐄𝐑𝐄 𝐌𝐯𝐞𝐥𝐚𝐬𝐞 𝐰𝐚.𝐛𝐨𝐭 𝐮𝐬𝐞𝐫 ! 👋* 

> *𝒂𝒅𝒗𝒂𝒏𝒄𝒆𝒅 𝒃𝒐𝒕 𝒄𝒂𝒍𝒍𝒆𝒅 𝑴𝒗𝒆𝒍𝒂𝒔𝒆-𝑴𝑫-𝑩𝑶𝑻 𝑳𝒐𝒂𝒅𝒆𝒅 𝒘𝒊𝒕𝒉 𝒂𝒎𝒂𝒛𝒊𝒏𝒈 𝒇𝒆𝒂𝒕𝒖𝒓𝒆𝒔.𝑴𝒗𝒆𝒍𝒂𝒔𝒆-𝑴𝑫-𝑩𝑶𝑻 𝒊𝒔 𝒕𝒉𝒆 𝒃𝒆𝒔𝒕 𝒃𝒐𝒕 𝒊𝒏 𝒕𝒉𝒆 𝒘𝒐𝒓𝒍𝒅. 🍁*

*𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆 𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐌𝐃-𝐁𝐎𝐓🌹🫶* 

> 𝐃𝐎𝐍'𝐓 𝐅𝐎𝐑𝐆𝐄𝐑𝐓 𝐓𝐎 𝐒𝐓𝐀𝐑 𝐀𝐍𝐃 𝐅𝐎𝐑𝐊 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎🌟🍴

> https://github.com/khulekanidube/MVELASE-MD-BOT

> ──────────────────
${readMore}
\`𝐁𝐎𝐓-𝐍𝐀𝐌𝐄:\`❄️
> ${repoData.name}

\`𝐎𝐖𝐍𝐄𝐑-𝐍𝐀𝐌𝐄:\`👨‍💻
> ${repoData.owner.login}

\`𝐒𝐓𝐀𝐑𝐒:\`🌟
> ${repoData.stargazers_count}

\`𝐅𝐎𝐑𝐊𝐒:\`🍴
> ${repoData.forks_count}

\`𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍:\`📃
> ${repoData.description || 'No description'}\n
> ──────────────────

\n> *© ｐｏｗｅｒｅｄ ｂｙ ｍｖｅｌａｓｅ* 🎐`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/y9o7du.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411325763461@newsletter',
                    newsletterName: 'Mvelase Technology',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/repo.m4a' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411325763461@newsletter',
                    newsletterName: 'Mvelase Technology',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
