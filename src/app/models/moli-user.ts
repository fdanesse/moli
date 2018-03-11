export class MoliUser {

  constructor(
    // auth user data
    public uid: (string) = '',
    public displayName: (string) = '',
    public photoURL: (string) = '',
    public email: (string) = '',
    public emailVerified: (boolean) = false,
    public phoneNumber: (string) = '',
    public providerId: (string) = '',

    // personal user data
    public nombre: (string) = '',
    public apellido: (string) = '',
    public ci: (string) = '',
    public credencial: (string) = '',
    public direccion: (string) = '',
    public telefono: string[] = [],

    // laboral data
    public ncobro: (string) = '',
    public roles: string[] = []) {}

    setMoliUser(objeto) {
      for (const key in objeto) {
        if (key) {
          this[key] = objeto[key];
        }
      }
    }
}
