export function getValidPayload(type) : any {
    const lowercaseType = type.toLowerCase();
    switch (lowercaseType) {
        case 'create user':
            return {
                email: 'e@ma.il',
                password: 'password',
            };
        default:
            return undefined;
    }
}
export function convertStringToArray(string) {
    return string
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');
}