export class Liceomodel {

  constructor(
    public nombre: string = 'Mtra. Eidée Bellini Brillada',
    public direccion: string = 'Diego Lamas s/n',
    public departamento: string = 'San José',
    public localidad: string = 'San José de Mayo',
    // public telefonos: Array<string> = ['43485555'],
    // public emails: Array<string> = [],

    public uid: string = '',
    public creador: string = '',
    // public directores: Array<string> = [],
    // public administrativos: Array<string> = [],
    // public adscriptos: Array<string> = [],
    // public docentes: Array<string> = [],

    public horarios1: Object = {
      0: ['07:20', '08:00'],
      1: ['08:00', '08:45'],
      2: ['08:50', '09:35'],
      3: ['09:40', '10:25'],
      4: ['10:30', '11:10'],
      5: ['11:10', '11:55'],
      6: ['12:00', '12:45']
    },
    public horarios2: Object = {
      0: ['12:50', '13:30'],
      1: ['13:30', '14:15'],
      2: ['14:20', '15:05'],
      3: ['15:10', '15:55'],
      4: ['16:00', '16:45'],
      5: ['16:45', '17:25'],
      6: ['17:30', '18:15']
    },
    public horarios3: Object = {
      0: ['18:45', '19:15'],
      1: ['19:15', '19:45'],
      2: ['19:50', '20:20'],
      3: ['20:20', '20:50'],
      4: ['20:55', '21:25'],
      5: ['21:30', '22:00'],
      6: ['22:00', '22:30']
    }

    /*
    public grupos1 = {
      0: ['1º', '1'],
      1: ['1º', '2'],
      2: ['1º', '1'],
      3: ['1º', '2'],
      4: ['2º', '1'],
      5: ['3º', '1'],
      6: ['5º', 'H']
    },
    public grupos2 = {
      0: ['1º', '3'],
      1: ['2º', '2'],
      2: ['3º', '2'],
      3: ['4º', '1'],
      4: ['6º', 'D']
    },
    public grupos3 = {}
    */

  ) {}

}
