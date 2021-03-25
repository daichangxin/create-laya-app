import { Console } from '@inno/game-sdk';

const requestLogin = (unionID: string) => {
    Console.log(`requestLogin ,unionID:${unionID}`);
};

export const LoginOperate = {
    requestLogin,
};
