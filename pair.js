const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
const path = require('path');

let router = express.Router();
const pino = require('pino');

const {
    default: Arslan_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function Arslan_MD_PAIR_CODE() {

        const sessionPath = path.join(__dirname, 'temp', id); // ✅ FIX PATH

        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

        try {
            let Pair_Code_By_Arslan_Tech = Arslan_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(
                        state.keys,
                        pino({ level: 'fatal' }).child({ level: 'fatal' })
                    ),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            // ✅ number validation fix
            if (!num) {
                if (!res.headersSent) {
                    return res.send({ code: 'Number is required' });
                }
            }

            if (!Pair_Code_By_Arslan_Tech.authState.creds.registered) {
                await delay(1500);

                num = num.replace(/[^0-9]/g, '');

                const code = await Pair_Code_By_Arslan_Tech.requestPairingCode(num);

                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Arslan_Tech.ev.on('creds.update', saveCreds);

            Pair_Code_By_Arslan_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === 'open') {
                    await delay(5000);

                    const credsPath = path.join(sessionPath, 'creds.json'); // ✅ FIX PATH

                    let data = fs.readFileSync(credsPath); // (structure same রাখা হয়েছে)

                    await delay(800);

                    let b64data = Buffer.from(data).toString('base64');

                    let session = await Pair_Code_By_Arslan_Tech.sendMessage(
                        Pair_Code_By_Arslan_Tech.user.id,
                        { text: 'ARSLAN-MD~' + b64data }
                    );

                    let Arslan_MD_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨ Arslan-MD 🔷
║ ✨ ArslanMD OFFICIAL🔷
╚════════════════════╝

---

╔════════════════════◇
║『 YOU'VE CHOSEN Arslan-MD 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: 923237045919
║❍ 𝐑𝐞𝐩𝐨: https://github.com/Arslan-MD/Arslan_MD
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/KRyARlvcUjoIv1CPSSyQA5?mode=wwt
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306
║
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy Arslan-MD

---

Don't Forget To Give Star⭐ To My Repo
______________________________`;

                    // ✅ FIX VARIABLE NAME (biggest bug)
                    await Pair_Code_By_Arslan_Tech.sendMessage(
                        Pair_Code_By_Arslan_Tech.user.id,
                        { text: Arslan_MD_TEXT },
                        { quoted: session }
                    );

                    await delay(100);
                    await Pair_Code_By_Arslan_Tech.ws.close();

                    return await removeFile(sessionPath); // ✅ FIX PATH
                }

                // ✅ safer reconnect condition
                else if (
                    connection === 'close' &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output &&
                    lastDisconnect.error.output.statusCode != 401
                ) {
                    await delay(10000);
                    Arslan_MD_PAIR_CODE();
                }
            });

        } catch (err) {
            console.log('Service restarted');

            await removeFile(sessionPath); // ✅ FIX PATH

            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }

    return await Arslan_MD_PAIR_CODE();
});

module.exports = router;
