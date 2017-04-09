export class User {

  public _id: string;
  public email: string;
  public name: string;
  public role: string;

  get isAdmin() : boolean {
    return this.role === 'admin';
  }

  get roleLabel() : string {
    if (this.role === 'admin') {
      return 'Administrateur';
    }
    else {
      return 'Utilisateur';
    }
  }
}