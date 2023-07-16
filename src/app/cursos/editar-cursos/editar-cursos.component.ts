import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarCursosComponent>
  ) {

    this.editForm = this.formBuilder.group({
      id: [''],
      descripcion:['', [Validators.required]],
      cupo:['', [Validators.required]],
      horario:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const curso = this.data.id;
    
   this.cursosService.consultarCurso(curso).subscribe(
     (response: any) => {
       const cursosData = response.data[0];
       console.log(cursosData);
       

       this.editForm.setValue({
        id: cursosData.curso_id,
          descripcion: cursosData.curso_descripcion,
          cupo: cursosData.curso_cupo,
          horario: cursosData.curso_horario,
       });
     },
     (error) => {
       console.log(error);
     }
   );
 }

 onSubmit(): void {
    
  if(this.editForm.valid){
    const curso = {
      descripcion: this.editForm.value.descripcion,
      cupo: Number(this.editForm.value.cupo),
      horario: this.editForm.value.horario,
    }

    this.cursosService.actualizarCurso(this.editForm.value.id, curso).subscribe({
      next: (response: any) => {
        alert('Curso actualizado correctamente');
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


}

}
