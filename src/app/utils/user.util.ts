export class UserUtil {
    static get(): any {
        const data = localStorage.getItem('eshop.user');
        if (!data) return null;
        return JSON.parse(data);
    }

    static set(user: any) {
        localStorage.setItem('eshop.user', JSON.stringify(user));
    }

    static clear() {
        localStorage.removeItem('eshop.user');
    }



}