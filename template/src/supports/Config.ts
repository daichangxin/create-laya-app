import { RES } from '@inno/game-sdk';
import pako from 'pako';

let data: { [name: string]: any[] };
export async function loadConfig() {
    return new Promise((resolve, reject) => {
        const uri = 'res/config/config.dat';
        RES.load([{ url: uri, type: Laya.Loader.BUFFER }]).then((res) => {
            if (res) {
                const rawData: ArrayBuffer = Laya.loader.getRes(uri);
                const content = pako.inflate(new Uint8Array(rawData), { to: 'string' });
                data = JSON.parse(content);
                resolve(data);
            } else {
                reject(res);
            }
        });
    });
}

export function getConfig(name: string) {
    return data[name];
}
