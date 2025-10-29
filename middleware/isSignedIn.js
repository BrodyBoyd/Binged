import {auth} from "../auth.js";

export async function authMiddleware(req, res, next) {
  try {
    // Either pass headers directly to Better Auth API:
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    // now you have the user — pull the value you need:
    req.user = session.user;            // e.g. user.id, user.email
    req.session = session.session;      // session details
    next();
  } catch (err) {
    next(err);
  }
}
