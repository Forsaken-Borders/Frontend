class Cookie {
    public static Get(name: string): string | null {
        let cookies: string[] = document.cookie.split(';');
        cookies.forEach(cookie => {
            let cookieContent = cookie.split('=');
            if (cookieContent[0] == name) return decodeURIComponent(cookieContent[1]);
        });
        return null;
    }

    public static Set(name: string, content: any, hoursTilExpire: number): void {
        document.cookie += `${name.trim()}=${encodeURIComponent(content)};max-age=${hoursTilExpire * 60 * 60}; path=/;domain=my.forsaken-borders.net;secure`;
    }

    public static Update(name: string, content: any, hoursTilExpire: number): void {
        let cookies: string[] = document.cookie.split(';');
        for (let i: number = 0; i < cookies.length; i++) {
            let cookieContent = cookies[i].split('=');
            if (cookieContent[0].toLowerCase() == name.toLowerCase()) {
                cookies[i] = `${name.trim()}=${encodeURIComponent(content)};max-age=${hoursTilExpire * 60 * 60};path=/;domain=my.forsaken-borders.net;secure`;
                break;
            }
        }
        document.cookie = cookies.join(';');
    }

    public static Remove(name: string): void {
        let cookies: string[] = document.cookie.split(';');
        for (let i: number = 0; i < cookies.length; i++) {
            let cookieContent = cookies[i].split('=');
            if (cookieContent[0].toLowerCase() == name.toLowerCase()) {
                delete cookies[i];
                break;
            }
        }
        document.cookie = cookies.join(';');
    }
}