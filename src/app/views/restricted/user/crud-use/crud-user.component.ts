import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '../../../../service/helpers.service';
import { UserService } from '../../../../service/user.service';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';
import { GenericValidator } from '../../../../shared/components/input-type/validators/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormResetEventBus } from '../../../../shared/components/input-type/events/form-group-reset-event';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})
export class CrudUserComponent implements OnInit {
  userId: any;
  userData: any;

  formUser: FormGroup = new FormGroup({
    fullName: new  FormControl( null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    documentNumber: new  FormControl(null, [Validators.required, GenericValidator.CPFCNPJ]),
    dateBirthday: new FormControl(null, [Validators.required]),
    remuneration: new FormControl(null),
    languages: new FormControl(null),
    role: new FormControl(null),
    gender: new FormControl(null),
    tags: new FormControl(null),
    description: new FormControl(null),
    terms: new FormControl(null, [Validators.required]),
  });

  listRoles: any = [];
  listLanguages: any = [];
  listGender: any = [];

  loadingData = false;
  loadingRoles = false;
  loadingLanguages = false;
  loadingSend = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formResetEventBus: FormResetEventBus,
    private modalAlertService: ModalAlertService,
    private helpersService: HelpersService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadLanguages();
    this.loadGenders();

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUser();
    }
  }

  // Load data user
  loadUser() {
    this.loadingData = true;
    this.userService.loadUser(this.userId).subscribe({
      next: (response) => {
        this.userData = response;
        this.formUser.patchValue(response);
        this.loadingData = false;
      },
      error: (error) => {
        this.loadingData = false;
      }
    });
  }

  // Check continue
  checkChange() {
    if (this.formUser.valid && !this.loadingSend) {
      this.loadingSend = true;
      if (this.userId) {
        this.changeUser();
      } else {
        this.createUser();
      }
    } else {
      this.markAllControlsAsTouchedAndDirty(this.formUser);
      const data = {
        showWarningIcon: true,
        showCancelBtn: true,
        showConfirmBtn: true
      };
      this.modalAlertService.openModal('Aviso', 'Preencha os dados antes de continuar.', data, 'md');
    }
  }

  // Save insurance
  createUser() {
    const dataSend = {
      ...this.formUser.value,
      createAt: new Date(),
    };
    this.userService.createUser(dataSend).subscribe({
      next: (response) => {
        this.modalAlertService.openModal(
          'Sucesso',
          'Usuário cadastradoo com sucesso.',
          { showSuccessIcon: true, showConfirmBtn: true },
          'md'
        );
        this.formResetEventBus.emitFormReset(this.formUser);
        this.loadingSend = false;
      },
      error: (error) => {
        this.loadingSend = false;
      }
    });
  }

  // Change insurance
  changeUser() {
    const dataSend = {
      ...this.formUser.value,
      id: this.userId,
      createAt: this.userData.createAt,
    };
    this.userService.changeUser(this.userId, dataSend).subscribe({
      next: (response) => {
        this.modalAlertService.openModal(
          'Sucesso',
          'Usuário alterado com sucesso.',
          { showSuccessIcon: true, showConfirmBtn: true },
          'md'
        );
        this.formResetEventBus.emitFormReset(this.formUser);
        this.loadingSend = false;
      },
      error: (error) => {
        this.loadingSend = false;
      }
    });
  }

  // List languages
  loadLanguages() {
    this.loadingLanguages = true;
    this.helpersService.listLanguages().subscribe({
      next: (response) => {
        this.listLanguages = response;
        this.loadingLanguages = false;
      },
      error: (error) => {
        this.loadingLanguages = false;
      }
    });
  }

  // List roles
  loadRoles() {
    this.loadingRoles = true;
    this.helpersService.listRoles().subscribe({
      next: (response) => {
        this.listRoles = response;
        this.loadingRoles = false;
      },
      error: (error) => {
        this.loadingRoles = false;
      }
    });
  }

  // List gender
  loadGenders() {
    this.listGender = [
      {id: 1, name: 'Masculino'},
      {id: 2, name: 'Feminino'},
      {id: 0, name: 'Outro'},
    ];
  }

  // Cancel
  cancel() {
    this.router.navigate(['usuario/cadastro']).then();
  }

  // Force formGroup set touched and dirty
  markAllControlsAsTouchedAndDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.markAllControlsAsTouchedAndDirty(control);
      }
    });
  }
}
