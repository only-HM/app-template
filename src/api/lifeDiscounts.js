// import Mock from 'mockjs';
import Home_JSON from '@/assets/LifeDiscounts/json/HOME_DATA.json';
import CLASSIFY_JSON from '@/assets/LifeDiscounts/json/CLASSIFY_DATA.json';
import Err_JSON from '@/assets/LifeDiscounts/json/ERR_DATA.json';

import delay from '@/utils/delay.js';

/**
 * @returns JSON
 */
const getJSON = (key = '') => {
    if (!key) throw {
        msg: 'key isn\'t null',
    };
    let r = Math.random();
    return new Promise((resolve, reject) => {
        if (r > .1) {
            switch (key) {
                case 'HOME':
                    delay(resolve, Home_JSON);
                    break;
                case 'CLASSIFY':
                    delay(resolve, CLASSIFY_JSON);
                    break;
            };
        } else {
            delay(reject, Err_JSON);
        };
    });
};

export {
    getJSON,
};