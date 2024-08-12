
export class UserModel {
    constructor(config) {
        config = config || {};

        this.name = config.name || null;
        this.role = config.role || null;
        this.password = config.password || null;
        this.email = config.email || null;
    }

    toRest() {
        return {
            name: this.name,
            password: this.password,
            email: this.email,
            role: this.role
        };
    }

}