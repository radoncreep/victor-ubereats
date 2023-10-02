import randomize from "randomatic";

import { OneTimePasswordInterface, OtpConfig } from "./otp.interface";


export class OneTimePasswordService implements OneTimePasswordInterface {
    private defaultConfig: OtpConfig = {
        length: 6, 
        pattern: "alphanumeric"
    }

    readonly characterType: Record<OtpConfig["pattern"], string> =  {
        alphanumeric: 'A0',
        numeric: '0',
        alphabets: 'A',
        allCharacters: '*',
        specialCharacters: '!'
    }

    generate(config: OtpConfig) {
        if (config) {
            const length = config.length;
            const pattern = this.characterType[config.pattern];
            
            return randomize(pattern, length);
        }

        return randomize(this.defaultConfig.pattern, this.defaultConfig.length);
    }
}