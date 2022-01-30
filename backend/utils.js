import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
    }, process.env.JWT_SECRET || 'somesecret',
        {
            expiresIn: '1h'
        })
}

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.slice(7, auth.length); // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somesecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Недійсний токен' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'Неавторизований' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Пототчний користувач не має прав адміністратора' });
    }
}

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401).send({ message: 'Пототчний користувач не має прав продавця' });
    }
}

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin )) {
        next()
    } else {
        res.status(401).send({ message: 'Пототчний користувач не має прав продавця/адміністратора' });
    }
}