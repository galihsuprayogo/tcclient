import React from  'react';
import {
    IconLocation,
    IconNpwp,
    IconPersonUmkm,
    IconTelp
} from '../../../assets';

const Icon = ({icon}) => {
        switch (icon) {
            case 'profile' :
                return <IconPersonUmkm/>
            case 'npwp' :
                return <IconNpwp/>
            case 'telp' :
                return <IconTelp/>
            case 'loc' :
                return <IconLocation/>
            default :
                return <IconPersonUmkm/>
        }
};

export default Icon;
