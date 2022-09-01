import { createHmac } from '../crypto';
import base32 from 'thirty-two';
import React from "react";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Pressable, View } from 'react-native';
import { Avatar, Headline, Subheading, Text } from "react-native-paper";
import { themeColors } from './core/Themes';
import Svg, { Circle } from 'react-native-svg';

const Code = ({uuid}) => {
    const defAcc = {icon: 'help', issuer: 'error', account: 'error', secret: 'OZXWSZD2MVXG2ZTB', encoding: 'base32', digits: 6, period: 30}
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
        const counter = Math.floor(Date.now()/(period*1000));

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
        setCode(finalCode.slice(-digits));
        const interval = (acc.period * 1000) - (Date.now() % (acc.period * 1000));
        setTimeout(() => generateCode(acc), interval);
    }

    React.useEffect(() => {
        if (acc === defAcc) {
            retrieveAccount();
        }

        if (!code) {
            generateCode(acc);
        }

        let timer;
        if (!time) {
            let timerTime = Math.floor(((acc.period * 1000) - (Date.now() % (acc.period * 1000)))/1000);
            if (!timerTime) {
                timerTime = 30;
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

        return () => {
            clearInterval(timer);
        };
    }, [time])
    
    return (
        <Pressable android_ripple={{color: themeColors.light.lightGray}} style={{borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <Avatar.Icon icon={acc.icon} size={50} style={{marginHorizontal: 20}} />
            <Headline>
                {code}
                {'\n'}
                {acc.issuer
                    ? <Subheading style={{color: 'gray'}}>{`${acc.issuer} (${acc.account})`}</Subheading>
                    : <Subheading>{acc.account}</Subheading>
                }
            </Headline>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginStart: 'auto', marginEnd: 20}}>
                <Svg style={{height: 40, width: 40, transform: [{rotate: '-90deg'}]}} >
                    <Circle cx={20} cy={20} r={15} stroke={themeColors.light.lightGray} strokeWidth={5} strokeDasharray={2*Math.PI*15} />
                    <Circle cx={20} cy={20} r={15} stroke={themeColors.light.primary} strokeWidth={5} strokeDasharray={[(time/30)*2*Math.PI*15, 2*Math.PI*15]} />
                </Svg>
                <Text style={{position: 'absolute'}}>{time}</Text>
            </View>
        </Pressable>
    )
}

export default Code;