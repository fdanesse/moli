export class Liceomodel {

  constructor(
    public nombre: (string) = '',
    public direccion: (string) = '',
    public departamento: (string) = '',
    public localidad: (string) = '',
    public telefonos: string[] = [],
    public emails: string[] = [],

    public turno1 = {
      0: ['07:20', '08:00'],
      1: ['08:00', '08:45']
      /*
      ['07:20', '08:00'],
      ['08:00', '08:45'],
      ['08:50', '09:35'],
      ['09:40', '10:25'],
      ['10:30', '11:10'],
      ['11:10', '11:55'],
      ['12:00', '12:45']
      */
    },
    public turno2 = {
      /*
      ['12:50', '13:30'],
      ['13:30', '14:15'],
      ['14:20', '15:05'],
      ['15:10', '15:55'],
      ['16:00', '16:45'],
      ['16:45', '17:25'],
      ['17:30', '18:15']
      */
    },
    public turno3 = {},

    public grupos1 = [
      /*
      ['1º', '1'],
      ['1º', '2'],
      ['2º', '1'],
      ['3º', '1'],
      ['5º', 'H']
      */
      ],
    public grupos2 = [
      /*
      ['1º', '3'],
      ['2º', '2'],
      ['3º', '2'],
      ['4º', '1'],
      ['6º', 'D']
      */
    ],
    public grupos3 = []

  ) {}

}
