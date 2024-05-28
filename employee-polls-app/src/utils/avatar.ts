function getAvatarImage(avatarName: string | undefined | null) {
    switch (avatarName) {
        case 'sarah.jpg':
            return require('../assets/img/sarah.jpg');
        case 'john.jpg':
            return require('../assets/img/john.jpg');
        case 'tyler.jpg':
            return require('../assets/img/tyler.jpg');
        default:
            return require('../assets/img/employees_pool_logo.jpg');
    }
}

export default getAvatarImage;