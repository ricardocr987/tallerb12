import bs58 from "bs58";
import nacl from "tweetnacl";
type SignMessageProps = {
  publicKey: string;
  nonce: string;
  statement: string;
};

export class SignMessage {
  publicKey: string;
  nonce: string;
  statement: string;

  constructor({ publicKey, nonce, statement }: SignMessageProps) {
    this.publicKey = publicKey;
    this.nonce = nonce;
    this.statement = statement;    
  }

  prepare() {
    return `${this.statement}${this.nonce}`;
  }

  async validate(signature: string) {
    const msg = this.prepare();
    const signatureUint8 = bs58.decode(signature);
    const msgUint8 = new TextEncoder().encode(msg);
    const pubKeyUint8 = bs58.decode(this.publicKey);

    return nacl.sign.detached.verify(msgUint8, signatureUint8, pubKeyUint8);
  }
}