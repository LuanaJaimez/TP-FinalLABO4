import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usuario = new User();

  constructor(private auth: AuthService,
              private readonly fb: FormBuilder, 
              private spinnerService: SpinnerService,
              private toastr: ToastrService) {                
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  ingresar(usuario: User) {
    this.spinnerService.show();
    this.auth.login(usuario.email, usuario.password).then(res => { 
    })
    .catch(e => { this.toastr.error(e.message) })
    .finally(() => {
      this.spinnerService.hide(); 
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.spinnerService.show();
    this.ingresar(this.form.value);
  }

  fillFormPatient() : void {
    this.form = this.fb.group({
      email: ['jaimezluana02@gmail.com'],
      password: ['123456'],
    });
  }

  fillFormDoctor() : void {
    this.form = this.fb.group({
      email: ['maria.luana.jaimez@gmail.com'],
      password: ['123456'],
    });
  }
}
