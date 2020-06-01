import JSONWebToken from "jsonwebtoken";

const secret = process.env.PUBLIC_KEY || `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALns1DW2lVs/Cjk9nVxBzG8Gn0QIF8wH
1LotLwuOk+lgVXZiXzkbMXxDzj3rEP0aVY0ATtqWxWcjurJXwqViLF0CAwEAAQ==
-----END PUBLIC KEY-----`;

const jsonWebTokenOptions = {
    algorithm: 'RS256',
    issuer: 'laudos',
};

export default function checkAuth() {
    var token = localStorage.getItem('AuthToken');
    if (!token)
        return false;
    try {
        return JSONWebToken.verify(token, secret, jsonWebTokenOptions);
    } catch (error) {
        if (token)
            localStorage.removeItem('AuthToken');
        return false;
    }
}
