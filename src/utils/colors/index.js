const mainColors = {
    light : '#E3D1BE',
    dark : '#2F2519',
    semidark : '#919191',
    semired : '#E06379'
};

export const colors = {
    primary : mainColors.light,
    secondary : mainColors.dark,
    third : mainColors.semidark,
    text : {
        default : mainColors.dark,
        secondary: mainColors.light,
        third : mainColors.semidark,
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
