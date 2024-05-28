function getAvatarImage(avatarName: string | undefined | null) {
    switch (avatarName) {
        case 'sarahedo.jpg':
            return require('../assets/img/sarah.jpg');
        case 'johndoe.jpg':
            return require('../assets/img/john.jpg');
        case 'tylermcginnis.jpg':
            return require('../assets/img/tyler.jpg');
        default:
            return require('../assets/img/employees_pool_logo.jpg');
    }
}

export default getAvatarImage;