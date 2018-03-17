import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminliceos',
  templateUrl: './adminliceos.component.html',
  styleUrls: ['./adminliceos.component.css']
})
export class AdminliceosComponent implements OnInit {

  public horarios = {
    '1': [
      '07:00',
      '07:45',
      '08:35',
      '09:25',
      '10:10',
      '11:00',
      '11:50'
    ],
    '2': [
      '12:40',
      '13:25',
      '14:15',
      '15:05',
      '15:50',
      '16:40',
      '17:30'
    ],
    '3': [
      '18:45',
      '19:15',
      '19:50',
      '20:20',
      '20:55',
      '21:30',
      '22:00'
    ]
  };

  public grupos = {
    'Turno 1': [
      '1º 1',
      '1º 2',
      '1º 3',
      '2º 1',
      '2º 2',
      '3º 1',
      '3º 2',
      '4º 1',
      '4º 2'
    ],
    'Turno 2': [
      '1º 4',
      '2º 3',
      '2º 4',
      '3º 3',
      '4º 3'
    ],
    'Turno 3': [
      '1º 5',
      '2º 5',
      '3º 4',
      '4º 4'
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
