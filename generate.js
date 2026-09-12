const fs = require("fs");
const path = require("path");

const SONGS_DIR = "./songs";
const DATA_DIR = "./data";

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

fs.readdirSync(SONGS_DIR).forEach(category => {
    const categoryPath = path.join(SONGS_DIR, category);

    if (!fs.statSync(categoryPath).isDirectory()) return;

    const songs = [];

    fs.readdirSync(categoryPath).forEach(file => {
        if (!file.endsWith(".mp3")) return;

        songs.push({
            title: path.parse(file).name,
            file: file
        });
    });

    fs.writeFileSync(
        `${DATA_DIR}/${category}.json`,
        JSON.stringify(songs, null, 2)
    );
});

console.log("Done!");