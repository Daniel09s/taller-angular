import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.css']
})
export class RegistroCursosComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<RegistroCursosComponent>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      cupo:['', [Validators.required]],
      horario:['', [Validators.required]],
      profesor:['', [Validators.required]],
    });
  }

  onSubmit(){

    if(this.registroForm.valid){
      
      console.log(this.registroForm.value);

      const curso = {
        nombre: this.registroForm.value.nombre,
        descripcion: this.registroForm.value.descripcion,
        cupo: Number(this.registroForm.value.cupo),
        horario: this.registroForm.value.horario,
        profesor: this.registroForm.value.profesor,
      }

      this.cursosService.registrarCurso(curso).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("Estudiante registrado correctamente");
          this.dialogRef.close();

        },
        error: (error) => {
          if(error.error?.message instanceof Array){
            let errorMessage = '';
            error.error.message.forEach((err:any, index: number) => {
              errorMessage += `${index+1}. ${err} \n`;              
            });

            alert(errorMessage);

          }else{
            alert("Ha ocurrido un error desconocido");
          }
        }
      });



    }else{
      this.registroForm.markAllAsTouched();
    }
    
  }

}
