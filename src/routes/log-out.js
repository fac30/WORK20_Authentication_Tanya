const { removeSession } = require('../model/session.js'); 

function post(req, res) {
    const sid = req.signedCookies.sid;
      removeSession(sid);
      res.clearCookie('sid');
      return res.redirect('/');
  /**
   * [1] Get the session ID from the cookie
   * [2] Remove that session from the DB
   * [3] Remove the session cookie
   * [4] Redirect back home
   */
  // res.status(500).send("");
}

module.exports = { post };
