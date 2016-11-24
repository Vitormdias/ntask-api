import https from "https";
import fs from "fs";

module.exports = app => {
    if (process.env.NODE_ENV !== 'test') {
        const credentials = {
            key: fs.readFileSync("52923702-ntask-api.key", "utf8"),
            cert: fs.readFileSync("52923702-ntask-api.cert", "utf8")
        }
        app.db.sequelize.sync().done(() => {
            https.createServer(credentials , app)
                .listen(app.get("port"), () => {
                    console.log(`NTask API - porta ${app.get("port")}`);
            });
        });
    }
};
