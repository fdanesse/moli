import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Form
import { Subscription } from 'rxjs/Subscription';

import { MoliUser } from '../../models/moli-user';
import { Liceomodel } from '../../models/liceomodel';

// https://www.concretepage.com/angular-2/angular-2-formgroup-example
// https://www.youtube.com/watch?v=WjcL09xgo3o

import { TurnoComponent } from '../../componentes/turno/turno.component';
import { GruposComponent } from '../../componentes/grupos/grupos.component';
import { TelefonosComponent } from '../../componentes/telefonos/telefonos.component';
import { EmailsComponent } from '../../componentes/emails/emails.component';

import { UserloggedService } from '../../servicios/userlogged/userlogged.service';
import { LiceosService } from '../../servicios/liceos/liceos.service';


@Component({
  selector: 'app-adminliceos',
  templateUrl: './adminliceos.component.html',
  styleUrls: ['./adminliceos.component.css'],
  providers: [LiceosService]
})
export class AdminliceosComponent implements OnInit, OnDestroy {

  public Object = Object;
  private loginSubscription: Subscription;
  private misliceosSubscription: Subscription;
  public user: MoliUser = new MoliUser();

  // FIXME: Liceos == query liceos con _id == user._id + 'Nuevo Liceo'
  public misliceos: Array<Liceomodel> = [];

  public departamentos = ['Artigas', 'Salto', 'Paysandú',
    'Rio Negro', 'Rivera', 'Tacuarembó', 'Soriano', 'Colonia',
    'Flores', 'Dirazno', 'Florida', 'San José', 'Montevideo',
    'Canelones', 'Lavalleja', 'Maldonado', 'Cerro Largo',
    'Treinta y Tres', 'Rocha'];

  public liceo: Liceomodel = new Liceomodel();

  /*
  public turno1 = new FormControl('', [Validators.nullValidator]);
  public turno2 = new FormControl('', [Validators.nullValidator]);
  public turno3 = new FormControl('', [Validators.nullValidator]);

  public grupos1 = new FormControl('', [Validators.nullValidator]);
  public grupos2 = new FormControl('', [Validators.nullValidator]);
  public grupos3 = new FormControl('', [Validators.nullValidator]);
  */

  public liceoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    // telefonos: new FormControl('', [Validators.required]),
    // emails: new FormControl('', [Validators.required]),
    // turno1: this.turno1, turno2: this.turno2, turno3: this.turno3,
    // grupos1: this.grupos1, grupos2: this.grupos2, grupos3: this.grupos3,
    uid: new FormControl('', [Validators.required]),
    creador: new FormControl('', [Validators.required]),
    // directores: new FormControl('', [Validators.nullValidator]),
    // administrativos: new FormControl('', [Validators.nullValidator]),
    // adscriptos: new FormControl('', [Validators.nullValidator]),
    // docentes: new FormControl('', [Validators.nullValidator])
  });

  /*
  public grupos = {1: this.liceo.grupos1, 2: this.liceo.grupos2, 3: this.liceo.grupos3};
  public horarios = {1: this.liceo.turno1, 2: this.liceo.turno2, 3: this.liceo.turno3};
  */

  constructor(
    public userLogged: UserloggedService,
    public liceosService: LiceosService
  ) {}



  changedLiceo(event) {
    console.log('Changed Liceo:', event.target.value);
    this.liceo = this.misliceos[event.target.value];
  }

  deleteLiceo() {
    console.log('DeleteLiceo:');
  }

  newLiceo() {
    console.log('addLiceo:');
    /* FIXME:
      Cargar los datos por defecto
      Agregar en creador el _id del usuario logueado si es director en roles
      Crear el uid del liceo usando time
    */
    if (this.user && this.user._id) {
      this.liceo = new Liceomodel();
      this.liceo.creador = this.user._id;
      const d = new Date();
      const t = d.getTime().toString();
      this.liceo['uid'] = t;
    }
  }


  /*
  addTelefono() {
    this.liceo.telefonos.push('');
  }

  addEmail() {
    this.liceo.emails.push('');
  }

  addHora(id: string) {
    switch (id) {
      case '1':
        const x = Object.keys(this.liceo.turno1);
        this.liceo.turno1[x.length] = ['00:00', '00:45'];
        break;
      case '2':
        const y = Object.keys(this.liceo.turno2);
        this.liceo.turno2[y.length] = ['00:00', '00:45'];
        break;
      case '3':
        const z = Object.keys(this.liceo.turno3);
        this.liceo.turno3[z.length] = ['00:00', '00:45'];
        break;
    }
  }

  addGrupo(id: string) {
    switch (id) {
      case '1':
        const x = Object.keys(this.liceo.grupos1);
        this.liceo.grupos1[x.length] = ['1º', '1'];
        break;
      case '2':
        const y = Object.keys(this.liceo.grupos2);
        this.liceo.grupos2[y.length] = ['1º', '1'];
        break;
      case '3':
        const z = Object.keys(this.liceo.grupos3);
        this.liceo.grupos3[z.length] = ['1º', '1'];
        break;
    }
  }
  */

  listenLogin() {
    /*
    Solo el usuario que creó el liceo puede modificar datos aquí,
    por eso es necesario obtener el valor de _id del usuario logueado
    que se corresponde con el campo creador del liceo
    */
    // FIXME: El usuario debe tener director en su lista de roles
    this.loginSubscription = this.userLogged.obs.subscribe(user => {
      this.user = Object.assign({}, user);
      if (this.user && this.user.uid) {
        console.log('*** Usuario Logueado', this.user.uid);
        if (this.misliceosSubscription) {
          this.misliceosSubscription.unsubscribe();
        }
        this.listeLiceos(this.user._id);
      }
    });
  }

  listeLiceos(_id: string) {
    // Carga de liceos creados por este usuario
    this.misliceosSubscription = this.liceosService.queryCreador(_id)
      .subscribe(data => {
        if (data) {
          this.misliceos = [];
          for (const _doc of data) {
            const liceo = new Liceomodel();
            for (const key in _doc) {
              if (key) {
                liceo[key] = _doc[key];
              }
            }
            this.misliceos.push(liceo);
          }
          // FIXME: telefonos, emails, turnos, grupos no se limpian.
          if (this.misliceos.length > 0) {
            this.liceo = this.misliceos[0];
          }
          // FIXME: Si todo está bien escrito esto no es necesario:
          // this.liceoForm.setValue(this.liceo);
        }
    });
  }

  ngOnInit() {
    // this.newLiceo();
    // Escucha de usuario logueado
    this.listenLogin();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.misliceosSubscription) {
      this.misliceosSubscription.unsubscribe();
    }
  }

  save() {
    // FIXME: Establecer Criterios de validacion del formulario
    if (!this.liceoForm.valid) {
      alert ('El formulario no es válido');
    }
    // this.liceo['creador'] = this.user.uid;
    this.liceosService.saveLiceo(this.liceo['uid'], this.liceo);
  }

  delete() {
    // this.userData.deleteUser(this.user.uid);
  }
}
