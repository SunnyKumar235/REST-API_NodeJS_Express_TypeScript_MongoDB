import jwt from "jsonwebtoken";
import config from 'config';
import fs from 'fs';


const RSA_PRIVATE_KEY = fs.readFileSync(__dirname+'/../../jwtRS256.key');
const RSA_PUBLIC_KEY = fs.readFileSync(__dirname+'/../../jwtRS256.key.pub');

// export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
//     return jwt.sign(object, privateKey, { ...(options && options), algorithm: 'ES256' })

// }

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
  ) {
    return jwt.sign(object, RSA_PRIVATE_KEY, {
      ...(options && options),
      algorithm: "RS256",
    });
  }

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, RSA_PUBLIC_KEY);
        return {
          valid: true,
          expired: false,
          decoded,
        };
      } catch (e: any) {
        console.error(e);
        return {
          valid: false,
          expired: e.message === "jwt expired",
          decoded: null,
        };
      }

}