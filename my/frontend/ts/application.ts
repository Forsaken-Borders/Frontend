import "./lib/cookie.ts";

async function main() {
    let loginElement: HTMLElement = document.getElementById("username");
    let pfpElement: HTMLElement = document.getElementById("profile_picture");
    let userId: string | null = Cookie.Get("id");

    if (userId == null) {
        pfpElement.remove();
    } else { }
}


