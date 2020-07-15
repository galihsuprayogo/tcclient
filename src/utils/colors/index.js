const mainColors = {
    light : '#E3D1BE',
    dark : '#2F2519',
    semidark : '#919191',
    semired : '#E06379'
};

export const colors = {
    primary : mainColors.light,
    secondary : mainColors.dark,
    text : {
        default : mainColors.dark,
        secondary: mainColors.light,
        input : mainColors.dark,
    },
    icon : {
        active : mainColors.light,
        inactive : mainColors.semidark
    },
    message : {
        error : mainColors.semired
    }
};
