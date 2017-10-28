interface UserParam {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export class User {

  public _id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;

  /**
   * Constructor
   *
   * @param {UserParam} user
   */
  constructor(user?: UserParam) {
    if (user) {
      this._id = user._id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.role = user.role;
    }
    else {
      this.role = 'user';
    }
  }

  /**
   * Return true is user is admin
   *
   * @returns {boolean}
   */
  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  /**
   * Return role label
   *
   * @returns {string}
   */
  get roleLabel(): string {
    if (this.role === 'admin') {
      return 'Administrateur';
    } else {
      return 'Utilisateur';
    }
  }
}
