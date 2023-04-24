const regexUpper = /[A-ZÀÁÂÃÈÉÊÌÍÎÒÓÕÔÙÚÛÇ\s]/;
const regexLower = /[a-zàáâãèéêìíîòóõôùúûç\s]/;
const regexNumber = /[0-9]/;

export function checkName(name: string) {
    let userName = name;
    let isLetter = true;

    if (name.length <= 1) return false;

    for (let i = 0; i < name.length; i++) {
        if (!name[i].match(regexLower) && !name[i].match(regexUpper)) {
            isLetter = false;
            break;
        }
    }

    if (!isLetter) return false;

    if (name[0] !== name[0].toUpperCase()) {
        const firstLetter = name[0].toUpperCase();
        userName = `${firstLetter}${name.substring(1, name.length)}`;
    }

    return userName;
}

export function checkEmail(email: string) {
    const regexSpecial = /[-_*&#.]/;

    if (email.match(/[@]/g) !== null) {
        if (email.match(/[@]/g)?.length !== 1) {
            return false;
        }
    } else {
        return false;
    }

    const [name, domain] = email.split('@');

    //CHECK EMAIL NAME
    if (name.length <= 1) return false;
    if (name.includes('.')) {
        if (name.startsWith('.') || name.endsWith('.')) return false;
    }
    for (let i = 0; i < name.length; i++) {
        if (name[i] === '.' && name[i + 1] === '.') return false;
        if (
            !name[i].match(regexUpper) &&
            !name[i].match(regexLower) &&
            !name[i].match(regexSpecial) &&
            !name[i].match(regexNumber)
        )
            return false;
    }

    //CHECK DOMAIN
    if (domain.match(/[.]/g) === null) return false;
    if (domain.match(/[.]/g)?.length === 1) {
        const [typeMail, dot] = domain.split('.');
        if (typeMail.length <= 1) return false;
        for (let i = 0; i < typeMail.length; i++) {
            if (
                !typeMail[i].match(regexUpper) &&
                !typeMail[i].match(regexLower) &&
                !typeMail[i].match(regexNumber)
            )
                return false;
        }
        if (dot !== 'com') return false;
    } else return false;

    return email.toLowerCase();
}

export function checkPassword(password: string) {
    const regexSpecial = /[-_*&@#]/;

    //Upper
    if (!password.match(regexUpper)) return false;
    //Lower
    if (!password.match(regexLower)) return false;
    //Number
    if (!password.match(regexNumber)) return false;
    //Special
    if (!password.match(regexSpecial)) return false;
    //Length
    if (password.length <= 7) return false;

    return password;
}
