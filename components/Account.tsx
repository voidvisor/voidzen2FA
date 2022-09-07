/**
 * @format
 */

import { createHmac } from '../crypto';
import base32 from 'thirty-two';
import React from "react";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Pressable, View } from 'react-native';
import { Avatar, Headline, IconButton, Subheading, Text, useTheme } from "react-native-paper";
import Svg, { Circle } from 'react-native-svg';
import { accountStyle as style } from './core/Style';

const Code = ({uuid}) => {
    const { colors } = useTheme();
    const defAcc = {icon: 'help', issuer: 'error', account: 'error', secret: 'OZXWSZD2MVXG2ZTB', encoding: 'base32', digits: 6, period: 30, counter: 0, totp: false}
    const [code, setCode] = React.useState('');
    const [acc, setAcc] = React.useState(defAcc);
    const [time, setTime] = React.useState(0);
    const timeRef = React.useRef(time);

    const retrieveAccount = async () => {
        try {
        const account = await EncryptedStorage.getItem(uuid);
        if (account) {
            setAcc(JSON.parse(account!));
        }
        } catch (error) {
        console.error(error);
        }
    }

    const generateCode = (input) => {
        let secret = input.secret;
        const encoding = input.encoding;
        const digits = input.digits;
        const period = input.period;
        let counter;
        if (input.totp) {
            counter = Math.floor(Date.now()/(period*1000));
        } else {
            counter = input.counter;
            input.counter++;
            setAcc(input);
        }

        if (!Buffer.isBuffer(secret)) {
            if (encoding === 'base32') {
                secret = base32.decode(secret);
            }
            secret = Buffer.from(secret, encoding);
        }
        
        let buf = Buffer.alloc(8);
        let tmp = counter;
        for (let i = 0; i < 8; i++) {
            buf[7 - i] = tmp & 0xff;
            tmp = tmp >> 8;
        }
        
        let hmac = createHmac('sha1', secret);
        hmac.update(buf);
        const digest = hmac.digest();
        
        const offset = digest[digest.length - 1] & 0xf;
        var code = (digest[offset] & 0x7f) << 24 |
            (digest[offset + 1] & 0xff) << 16 |
            (digest[offset + 2] & 0xff) << 8 |
            (digest[offset + 3] & 0xff);
        
        let finalCode = code.toString(10).padStart(digits, '0');
        return finalCode.slice(-digits);
    }

    const totpLoop = (input) => {
        setCode(generateCode(input));
        const interval = (input.period * 1000) - (Date.now() % (input.period * 1000));
        setTimeout(() => totpLoop(input), interval);
    }

    React.useEffect(() => {
        let timer;

        if (acc === defAcc) {
            retrieveAccount();
        }

        if (!code && acc.totp) {
            totpLoop(acc);
        }

        if (acc.totp) {
            if (!time) {
                let timerTime = Math.floor(((acc.period * 1000) - (Date.now() % (acc.period * 1000)))/1000);
                if (!timerTime) {
                    timerTime = acc.period;
                }
                timeRef.current = timerTime;
                timer = setTimeout(() => {
                    timeRef.current = timerTime-1;
                    if (timeRef.current < 0) {
                      clearTimeout(timer);
                    } else {
                      setTime(timeRef.current);
                      timer = setInterval(() => {
                        timeRef.current--;
                        if (timeRef.current < 0) {
                          clearInterval(timer);
                        } else {
                          setTime(timeRef.current);
                        }
                      }, 1000);
                    }
                  }, 1000 - (Date.now() % 1000));
            } else {
                timer = setInterval(() => {
                    timeRef.current--;
                    if (timeRef.current < 0) {
                      clearInterval(timer);
                    } else {
                      setTime(timeRef.current);
                    }
                  }, 1000 - (Date.now() % 1000));
            }
        } else {
            setCode(code.padStart(acc.digits, '-'))
        }

        return () => {
            clearInterval(timer);
        };
    }, [acc, time])
    
    return (
        <Pressable android_ripple={{color: colors.backdrop}} style={style.pressable}>
            <Avatar.Icon icon={acc.icon} size={50} style={style.icon} />
            <Headline>
                {code}
                {'\n'}
                {acc.issuer
                    ? <Subheading style={{color: colors.description}}>{`${acc.issuer} (${acc.account})`}</Subheading>
                    : <Subheading>{acc.account}</Subheading>
                }
            </Headline>
            {acc.totp
            ? <View style={style.timerView}>
                <Svg style={style.timerSvg} >
                    <Circle cx={20} cy={20} r={15} stroke={colors.backdrop} strokeWidth={5} strokeDasharray={2*Math.PI*15} />
                    <Circle cx={20} cy={20} r={15} stroke={colors.primary} strokeWidth={5} strokeDasharray={[(time/acc.period)*2*Math.PI*15, 2*Math.PI*15]} />
                </Svg>
                <Text style={style.timerText}>{time}</Text>
            </View>
            : <IconButton icon={'refresh'} style={style.hotpRefresh} color={colors.primary} onPress={() => {setCode(generateCode(acc))}} />
            }
        </Pressable>
    )
}

export default Code;