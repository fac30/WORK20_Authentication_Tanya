const { Layout } = require("../templates.js");
const { getSession } = require('../model/session.js');

function get(req, res) {
  const sid = req.signedCookies.sid; // or req.cookies.sid depending on your setup
  //console.log('Session ID:', sid); // Log the session ID to check if it's present
  
  const session = getSession(sid); 
  //console.log('Session Data:', session);
  /**
   * [1] Read session ID from cookie
   * [2] Get session from DB
   * [3] If the session exists render a log out form
   * [4] This should submit a request to `POST /log-out`
   * [5] Else render the sign up/log in links
   */
  const title = "Confess your secrets!";
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1> 
      ${session ? `
        <form method="POST" action="/log-out">
          <button class="Button">Log out</button>
        </form>` : `
        <nav>
          <a href="/sign-up">Sign up</a> or <a href="/log-in">Log in</a>
        </nav>`
      }
    </div>
  `;
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };
