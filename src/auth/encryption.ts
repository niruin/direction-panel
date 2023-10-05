import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const SECRET = 'DFKJIFOfsd09f8sdfDFSDF';
export async function encode (textToEncrypt: string) {

  const key = (await promisify(scrypt)(SECRET, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);

  return encryptedText
}
export async function decode (encryptedText) {
  const key = (await promisify(scrypt)(SECRET, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decryptedText;
}

// const en = await encode('hellow world')
// console.log('crypto', en.toString('base64'));
// const de = await decode(Buffer.from(en.toString('base64'), 'base64'))
// console.log('crypto de', de.toString());