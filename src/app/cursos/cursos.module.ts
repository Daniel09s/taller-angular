import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { RegistroCursosComponent } from './registro-cursos/registro-cursos.component';
import { EditarCursosComponent } from './editar-cursos/editar-cursos.component';
import { VerCursosComponent } from './ver-cursos/ver-cursos.component';


@NgModule({
  declarations: [
    ListadoCursosComponent,
    RegistroCursosComponent,
    EditarCursosComponent,
    VerCursosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
  ]
})



export class CursosModule { }
