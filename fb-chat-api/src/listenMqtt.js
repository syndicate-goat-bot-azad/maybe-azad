// Author: Azad
// Listen MQTT with Command Handler Support

const utils = require("./utils");
const path = require("path");
const fs = require("fs");

// Command গুলো load
const commands = new Map();
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith(".js")) {
        const cmd = require(path.join(commandsPath, file));
        commands.set(cmd.config.name, cmd);
    }
});

function listenMqtt(defaultFuncs, api, ctx, globalCallback) {
    const mqttClient = ctx.mqttClient;

    mqttClient.on("message", function (topic, message) {
        let jsonMessage;
        try {
            jsonMessage = Buffer.isBuffer(message) ? message.toString() : message;
            jsonMessage = JSON.parse(jsonMessage);
        } catch (err) {
            return;
        }

        if (!jsonMessage || Object.keys(jsonMessage).length === 0) return;

        try {
            if (topic === "/t_ms" && jsonMessage.deltas) {
                for (const delta of jsonMessage.deltas) {
                    parseDelta(defaultFuncs, api, ctx, globalCallback, { delta });
                }
            }
        } catch (e) {
            console.error("❌ LISTEN_MQTT error:", e, jsonMessage);
        }
    });
}

// -------------------------------
// Command Handler সহ parseDelta
// -------------------------------
function parseDelta(defaultFuncs, api, ctx, globalCallback, v) {
    try {
        if (v.delta.class === "NewMessage") {
            let fmtMsg;
            try {
                fmtMsg = utils.formatDeltaMessage(v);
            } catch (err) {
                return globalCallback({
                    error: "Problem parsing message object.",
                    detail: err,
                    res: v,
                    type: "parse_error"
                });
            }

            if (fmtMsg && fmtMsg.body) {
                const body = fmtMsg.body.trim();
                const threadID = fmtMsg.threadID;

                // 🟢 Command detect
                const parts = body.split(" ");
                const commandName = parts[0].toLowerCase();
                const args = parts.slice(1);

                if (commands.has(commandName)) {
                    try {
                        commands.get(commandName).run({
                            api,
                            event: fmtMsg,
                            args,
                            message: body,
                            threadID
                        });
                    } catch (cmdErr) {
                        api.sendMessage("❌ এই কমান্ড চালাতে সমস্যা হচ্ছে।", threadID);
                        console.error("Command error:", cmdErr);
                    }
                }

                // Self listen না হলে callback এ পাঠাবে
                if (
                    !ctx.globalOptions.selfListen &&
                    (fmtMsg.senderID !== ctx.i_userID &&
                        fmtMsg.senderID !== ctx.userID)
                ) {
                    globalCallback(null, fmtMsg);
                }
            }
        }
    } catch (err) {
        console.error("❌ parseDelta error:", err, v);
    }
}

module.exports = listenMqtt;
