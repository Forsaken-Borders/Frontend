namespace Api {
    export enum Rank {
        master,
        admin,
        moderator,
        normal
    }

    export class User {
        constructor(public id: string, private useMethods: boolean, private custompfp: boolean, hasEmail: boolean, hasVpn: boolean, rank: Rank) {
            fetch(`https://my.forsaken-borders.net/users/${id}/`).then(function (response) {
                switch (response.status) {
                    case 404:
                        useMethods = false;
                        throw new Api.Errors.UnknownUserError("UnknownUser", "User cannot be found.", this);
                    case 410:
                        useMethods = false;
                        throw new Api.Errors.DeletedUserError("DeletedUser", "This user was deleted.", this);
                    case 423:
                        useMethods = false;
                        throw new Api.Errors.LockedUserError("LockedUser", "This user was locked.", this);
                    case 302:
                        useMethods = true;
                        return response.text();
                    default:
                        useMethods = false;
                        throw new Api.Errors.OfflineError("ApiOffline", "Failed to check if user id exists.", response.status);
                }
            }).then(function (data: string) {
                let lines: string[] = data.split('\n');
                for (let i: number = 0; i < lines.length; i++) {
                    let content: string[] = lines[i].split(':');
                }
            });
        }
    }
}