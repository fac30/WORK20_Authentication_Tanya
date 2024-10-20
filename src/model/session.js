const db = require("../database/db.js");

const insert_session = db.prepare(`INSERT INTO sessions (id, user_id, expires_at)
  VALUES (
  $id,
  $user_id,
  DATE('now', '+7 days')
)`);

const crypto = require('crypto');

function createSession(user_id) {
  const id = crypto.randomBytes(64).toString('hex');
  insert_session.run({ id, user_id });
  return id;
}

const select_session = db.prepare(`
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}

const delete_session = db.prepare(`
  DELETE FROM sessions WHERE id = ?
`);

function removeSession(sid) {
  return delete_session.run(sid);
}

module.exports = { createSession, getSession, removeSession };
