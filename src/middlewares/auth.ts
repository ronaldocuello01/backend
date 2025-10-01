import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload {
    id: number;
	nombre: string,
	email: string,
    rol: number;
    iat: number;
    exp: number;
}

interface CustomRequest extends Request {
    token?: string;
    user?: AuthPayload;
}

export function verifyToken(requiredRole: number[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const bearer = req.headers['authorization'];
        const SECRET = 'secret';

        if (typeof bearer !== 'undefined') {
            const token = bearer.split(" ")[1];
            req.token = token;

            jwt.verify(req.token, SECRET, (error, authData) => {
                if (error) {
                    return res.status(403).json({ message: 'No tiene permisos (Token inválido).' });
                }
                
                const userPayload = authData as AuthPayload;
                req.user = userPayload;

                console.log(`Payload JWT: ${JSON.stringify(userPayload)}`);
                
                if (requiredRole.includes(userPayload.rol)) { 
                    next();
                } else {
                    // console.log(JSON.stringify(
                    // { 
                    //     message: 'Acceso denegado. Rol insuficiente.',
                    //     userRole: userPayload.rol,
                    //     requiredRole: requiredRole
                    // }
                    // ));
                    
                    return res.status(403).json({ 
                        message: 'Acceso denegado.'
                    });
                }
            });
        } else {
            return res.status(401).json({ message: 'Falta token.' });
        }
    }
}