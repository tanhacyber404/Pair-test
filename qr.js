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
	default: Arslan_Tech,
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

const { readFile } = require("node:fs/promises")

router.get('/', async (req, res) => {
	const id = makeid();

	async function Arslan_MD_QR_CODE() {

		const sessionPath = path.join(__dirname, 'temp', id); // ✅ FIX PATH

		const {
			state,
			saveCreds
		} = await useMultiFileAuthState(sessionPath)

		try {
			let Qr_Code_By_Arslan_Tech = Arslan_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Arslan_Tech.ev.on('creds.update', saveCreds)

			let qrSent = false; // ✅ prevent multiple response

			Qr_Code_By_Arslan_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;

				// ✅ send QR only once
				if (qr && !qrSent) {
					qrSent = true;
					return res.end(await QRCode.toBuffer(qr));
				}

				if (connection == "open") {
					await delay(5000);

					const credsPath = path.join(sessionPath, 'creds.json'); // ✅ FIX PATH

					let data = await readFile(credsPath); // ✅ async read

					await delay(800);

					let b64data = Buffer.from(data).toString('base64');

					let session = await Qr_Code_By_Arslan_Tech.sendMessage(
						Qr_Code_By_Arslan_Tech.user.id,
						{ text: 'ARSLAN-MD~' + b64data }
					);

					let Arslan_MD_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨Arslan-MD🔷
║ ✨ArslanMD OFFICIAL🔷
╚════════════════════╝

---

╔════════════════════◇
║『 YOU'VE CHOSEN Arslan-MD 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: youtube.com/@arslanmdofficial
║❍ 𝐎𝐰𝐧𝐞𝐫: 923237045919
║❍ 𝐑𝐞𝐩𝐨: https://github.com/Arslan-MD/Arslan_MD 
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/KRyARlvcUjoIv1CPSSyQA5?mode=wwt
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306
║❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _https://www.instagram.com/arslanmd
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy Arslan-MD

---

Don't Forget To Give Star⭐ To My Repo
______________________________`;

					await Qr_Code_By_Arslan_Tech.sendMessage(
						Qr_Code_By_Arslan_Tech.user.id,
						{ text: Arslan_MD_TEXT },
						{ quoted: session }
					);

					await delay(100);
					await Qr_Code_By_Arslan_Tech.ws.close();

					return removeFile(sessionPath); // ✅ FIX PATH
				}

				// ✅ safe reconnect check
				else if (
					connection === "close" &&
					lastDisconnect &&
					lastDisconnect.error &&
					lastDisconnect.error.output &&
					lastDisconnect.error.output.statusCode != 401
				) {
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

			removeFile(sessionPath); // ✅ FIX PATH
		}
	}

	return await Arslan_MD_QR_CODE()
});

module.exports = router
