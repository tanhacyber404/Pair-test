const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Nobi,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Nobi_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Nobi = Nobi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Nobi.ev.on('creds.update', saveCreds)
			Nobi.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Nobi.sendMessage(Nobi.user.id, { text: 'ARSLAN-MD~' + b64data });
	
				   let Nobi_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨Nobi🔷
║ ✨Nobi🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN Nobi 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: https://youtube.com/@owov_bot?si=K0I3M0Utayhfr7jY
║❍ 𝐎𝐰𝐧𝐞𝐫: 919216405520
║❍ 𝐑𝐞𝐩𝐨: https://github.com/Arslan-MD/Arslan_MD 
║❍ tg: https://t.me/C20NX
║❍ tg2: https://t.me/FLU00123
║❍ tg bot: https://t.me/CH4TB3N_BOT
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy Nobi


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Nobi.sendMessage(Nobi.user.id,{text:Nobi_MD_TEXT},{quoted:session})



					await delay(100);
					await Nobi.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Arslan_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Nobi()
});
module.exports = router
