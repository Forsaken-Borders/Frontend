import { HttpError } from "./httpError";
import { UserPayload } from "./payloadTypes";
import { User } from "./types";

export class userApi {
    constructor(public url: string, private token: string) { }

    /**
     * Gets the user's information.
     * @param userId The user's id.
     * @param token The token used to authenticate yourself.
     * @returns A User object.
     * @throws HttpError if the request fails. Expected error codes are 404 NotFound and 410 Gone.
     */
    public async getUser(userId: string): Promise<User> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": this.token
            }
        });

        if (tokenRequest.status === 200) {
            return tokenRequest.json();
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     *
     * @param userPayload The user's information.
     * @returns The user id and the token.
     * @throws HttpError if the request fails. Expected error codes are 400 BadRequest and 409 Conflict.
     */
    public async createUser(userPayload: UserPayload): Promise<[string, string]> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users`, {
            method: "POST",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPayload)
        });

        if (tokenRequest.status === 201) {
            return [tokenRequest.headers.get("Location") as string, await tokenRequest.text()];
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Deletes the user from the API, if the user has the correct permissions.
     * @param userId The user to delete.
     * @returns True if the user was successfully deleted. HttpError if not.
     * @throws HttpError if the request fails. Expected error codes are 404 NotFound and 401 Unauthorized.
     */
    public async deleteUser(userId: string): Promise<boolean> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json"
            }
        });

        if (tokenRequest.status === 200) {
            return true;
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Updates the user's information.
     * @param userId The user to update.
     * @param userPayload What to update. Leave properties null for which ones you don't wish to update.
     * @returns True if the user was updated, False if the contents are the same, HttpError if the request failed.
     * @throws HttpError if the request fails. Expected error codes are 400 BadRequest, 401 Unauthorized, 404 NotFound and 409 Conflict.
     */
    public async updateUser(userId: string, userPayload: UserPayload): Promise<boolean> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPayload)
        });

        if (tokenRequest.status === 200) {
            return true;
        } else if (tokenRequest.status === 304) {
            return false;
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Attempts to login as a user.
     * @param email The user's email.
     * @param password The user's password.
     * @returns The user token if success, HttpError if the request failed.
     * @throws HttpError if the request fails. Expected error codes are 400 BadRequest, 401 Unauthorized, 404 NotFound and 410 Gone.
     */
    public async login(email: string, password: string): Promise<string> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (tokenRequest.status === 200) {
            return tokenRequest.text();
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Sends an email to attempt to reset the user's password.
     * @param email The user's email.
     * @returns True if the recovery email was successfully sent, HttpError if the request failed.
     * @throws HttpError if the request fails. Expected error codes are 400 BadRequest, 404 NotFound and 410 Gone.
     */
    public async forgotPassword(email: string): Promise<boolean> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: email
        });

        if (tokenRequest.status === 200) {
            return true;
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Attempts to reset the user's password through a recovery token.
     * @param token The recovery token used to reset the user's password.
     * @param password The new password for the user.
     * @returns True if the password was reset, HtpError if the request failed.
     * @throws HttpError if the request fails. Expected error codes are 400 BadRequest, 404 NotFound and 410 Gone.
     */
    public async resetPassword(token: string, password: string): Promise<boolean> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/reset/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                password: password
            })
        });

        if (tokenRequest.status === 204) {
            return true;
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }

    /**
     * Attempts to get the current user through the use of their token.
     * @returns The user corresponding to the token, HttpError if the request failed.
     * @throws HttpError if the request fails. Expected error codes are 404 NotFound.
     */
    public async whoAmI(): Promise<User> {
        let tokenRequest = await fetch(`${this.url}/api/v1/users/whoami`, {
            method: "GET",
            headers: {
                "Authorization": this.token
            }
        });

        if (tokenRequest.status === 200) {
            return tokenRequest.json();
        } else {
            throw new HttpError(tokenRequest.status, tokenRequest.statusText);
        }
    }
}