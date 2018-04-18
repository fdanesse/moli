import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Form
import { Subscription } from 'rxjs/Subscription';

import { MoliUser } from '../../models/moli-user';
import { Liceomodel } from '../../models/liceomodel';

// https://www.concretepage.com/angular-2/angular-2-formgroup-example
// https://www.youtube.com/watch?v=WjcL09xgo3o

// import { TurnoComponent } from '../../componentes/turno/turno.component';
// import { GruposComponent } from '../../componentes/grupos/grupos.component';
// import { TelefonosComponent } from '../../componentes/telefonos/telefonos.component';
// import { EmailsComponent } from '../../componentes/emails/emails.component';

import { UserloggedService } from '../../servicios/userlogged/userlogged.service';
import { LiceosService } from '../../servicios/liceos/liceos.service';

import { GrssComponent } from '../../componentes/grs/grss.component';
import { GrsComponent } from '../../componentes/grs/grs.component';


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
    // grupos1: this.grupos1, grupos2: this.grupos2, grupos3: this.grupos3,
    uid: new FormControl('', [Validators.required]),
    creador: new FormControl('', [Validators.required]),
    // directores: new FormControl('', [Validators.nullValidator]),
    // administrativos: new FormControl('', [Validators.nullValidator]),
    // adscriptos: new FormControl('', [Validators.nullValidator]),
    // docentes: new FormControl('', [Validators.nullValidator])
    horarios1: new FormControl('', [Validators.required]),
    horarios2: new FormControl('', [Validators.required]),
    horarios3: new FormControl('', [Validators.required])
  });

  constructor(
    public userLogged: UserloggedService,
    public liceosService: LiceosService
  ) {}

  changedLiceo(event) {
    console.log('Changed Liceo:', event.target.value);
    this.liceo = this.misliceos[event.target.value];
  }

  deleteLiceo() {
    this.liceosService.delete(this.liceo['uid']);
  }

  save() {
    // FIXME: Establecer Criterios de validacion del formulario
    if (!this.liceoForm.valid) {
      alert ('El formulario no es válido');
    }else {
      // this.liceo['creador'] = this.user.uid;
      this.liceosService.save(this.liceo['uid'], this.liceo);
    }
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
    }else {
      alert('Debes tener un usuario en la aplicación y estar logueado con él para poder realizar esta acción.');
    }
  }

  addHora(id: number) {
    switch (id) {
      case 1:
        const x = Object.keys(this.liceo.horarios1);
        this.liceo.horarios1[x.length] = ['00:00', '00:45'];
        break;
      case 2:
        const y = Object.keys(this.liceo.horarios2);
        this.liceo.horarios2[y.length] = ['00:00', '00:45'];
        break;
      case 3:
        const z = Object.keys(this.liceo.horarios3);
        this.liceo.horarios3[z.length] = ['00:00', '00:45'];
        break;
    }
  }

  eliminarHora(id: number, index: string) {
    switch (id) {
      case 1:
        delete this.liceo.horarios1[index];
        break;
      case 2:
        delete this.liceo.horarios2[index];
        break;
      case 3:
        delete this.liceo.horarios3[index];
        break;
    }
  }

  /*
  addTelefono() {
    this.liceo.telefonos.push('');
  }

  addEmail() {
    this.liceo.emails.push('');
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
        // console.log('*** Usuario Logueado', this.user.uid);
        if (this.misliceosSubscription) {
          this.misliceosSubscription.unsubscribe();
        }
        this.listenLiceos(this.user._id);
      }
    });
  }

  listenLiceos(_id: string) {
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

}
