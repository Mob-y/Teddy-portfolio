const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../data/portfolio.db"));

// Création de la table si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS player_progress (
    id INTEGER PRIMARY KEY DEFAULT 1,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    completed_quests TEXT DEFAULT '[]',
    badges TEXT DEFAULT '[]',
    titles TEXT DEFAULT '[]',
    active_badge TEXT DEFAULT NULL,
    active_title TEXT DEFAULT NULL
  )
`);

// Initialiser la ligne unique si elle n'existe pas
const row = db.prepare("SELECT * FROM player_progress WHERE id = 1").get();
if (!row) {
  db.prepare("INSERT INTO player_progress (id) VALUES (1)").run();
}

module.exports = db;