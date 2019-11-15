"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Metadata_1 = require("./Metadata");
class CryptoClient {
    constructor(request) {
        this.request = request;
    }
    sign(url, message) {
        return new Promise((res, rej) => {
            const docId = Metadata_1.validateDocURL(url);
            this.request({ type: 'SignMsg', docId, message }, (msg) => {
                if (msg.success)
                    return res(msg.signature);
                rej();
            });
        });
    }
    verify(url, message, signature) {
        return new Promise((res) => {
            const docId = Metadata_1.validateDocURL(url);
            this.request({ type: 'VerifyMsg', docId, message, signature }, (msg) => {
                res(msg.success);
            });
        });
    }
    sealedBox(publicKey, message) {
        return new Promise((res, rej) => {
            this.request({ type: 'SealedBoxMsg', publicKey, message }, (msg) => {
                if (msg.success)
                    return res(msg.sealedBox);
                rej();
            });
        });
    }
    openSealedBox(keyPair, sealedBox) {
        return new Promise((res, rej) => {
            this.request({ type: 'OpenSealedBoxMsg', keyPair, sealedBox }, (msg) => {
                if (msg.success)
                    return res(msg.message);
                rej();
            });
        });
    }
    encryptionKeyPair() {
        return new Promise((res, rej) => {
            this.request({ type: 'EncryptionKeyPairMsg' }, (msg) => {
                if (msg.success)
                    return res(msg.keyPair);
                rej();
            });
        });
    }
}
exports.default = CryptoClient;
//# sourceMappingURL=CryptoClient.js.map