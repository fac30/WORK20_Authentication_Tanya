const { removeSession } = require('../model/session.js'); 

async function post(req, res) {
  try {
    const sid = req.signedCookies.sid || req.cookies.sid;
    if (sid) {
      await removeSession(sid);
      res.clearCookie('sid');
      return res.redirect('/');
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.error('Error during logout:', err);
    return res.status(500).send('Failed to log out');
  }
  // const sid = req.signedCookie.sid;
  // removeSession(sid);
  // res.clearCookie('sid');
  // res.redirect('/');
  /**
   * [1] Get the session ID from the cookie
   * [2] Remove that session from the DB
   * [3] Remove the session cookie
   * [4] Redirect back home
   */
  // res.status(500).send("");
}

module.exports = { post };
