import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  
  public registerForm = this.fb.group({
    nombre: ['Fernando',[Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, ]],
    password2: ['123456',[Validators.required, ]],
    terminos: [true,[Validators.required, ]],
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder,private userService: UsuarioService,
              private router:Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    // establecer cuando el formulario se envio
    this.formSubmitted= true;
    console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return;
    }
    // Realizando el posteo de parametro mandamos todo el formulario
    this.userService.crearUsuario(this.registerForm.value).subscribe( resp => {
      // console.log('usuario creado');
      // console.log(resp);
      this.router.navigateByUrl('/');

    }, (err)=> {
      Swal.fire('Error', err.error.msg,'error');
    });
  }
  campoNoValido(campo:string):boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }
  contrasenasNoValida(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    // si las contraseñas no son iguales y el formulario ha sido posteado entonces regresa un true
    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  passwordsIguales(pass1Name: string, pass2Name: string){

    // regresando una funcion para poder utilizarla y checar los cambios del formulario
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      
      if( pass1Control?.value === pass2Control?.value){
        pass1Control?.setErrors(null);

      }else{
        pass1Control?.setErrors({noEsIgual:true})
      }
    }

  }

}
