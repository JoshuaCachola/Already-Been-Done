const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const bearerToken = require("express-bearer-token");
const { Skater } = require("./db/models");

const { secret, expiresIn } = jwtConfig;

const restoreSkater = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.skater = await Skater.findByPk(id);
    } catch (err) {
      return next(err);
    }

    if (!req.skater) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

const getSkaterToken = skater => {
  const skaterDataForToken = {
    id: skater.id,
    email: skater.email
  };
  const token = jwt.sign(
    { data: skaterDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );

  return token;
};

const requireAuth = [bearerToken(), restoreSkater];

module.exports = { getSkaterToken, requireAuth };
