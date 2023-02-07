export default function handler(req, res) {
    try {

        const { blankEmojis } = JSON.parse(req.body);
        console.log(blankEmojis);
        
        const fs = require("fs");
        fs.writeFile("blankEmojis.json", JSON.stringify(blankEmojis), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("File has been created");
        });
        
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
}
