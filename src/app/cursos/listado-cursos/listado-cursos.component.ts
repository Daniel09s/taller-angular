import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { RegistroCursosComponent } from '../registro-cursos/registro-cursos.component';
import { EditarCursosComponent } from '../editar-cursos/editar-cursos.component';
import { VerCursosComponent } from '../ver-cursos/ver-cursos.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.css']
})
export class ListadoCursosComponent implements OnInit {

  cursos: any[] = [];
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'cupo', 'horario', 'profesor', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<any>(this.cursos);

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next:(response: any) => {
        this.cursos = response.data;
        this.dataSource = new MatTableDataSource<any>(this.cursos);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  abrirDialogoRegistro() {

    const dialogRef = this.dialog.open(RegistroCursosComponent,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.cursosService.obtenerCursos().subscribe(
        (response: any) => {
          this.cursos = response.data;
          this.dataSource = new MatTableDataSource<any>(this.cursos);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
      
    });

  }

   verCurso(curso: number) {
    
    const dialogRef = this.dialog.open(VerCursosComponent,{
      width: '500px',
      data: {id: curso}
    });

  }

  abrirDialogoEditar(curso: number) {
    const dialogRefEdit = this.dialog.open(EditarCursosComponent,{
      width: '500px',
      data: {id: curso}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      next:this.cursosService.obtenerCursos().subscribe(
        (response: any) => {
          this.cursos = response.data;
          this.dataSource = new MatTableDataSource<any>(this.cursos);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
      
    });
  }

  inhabilitarCurso(curso: number) {
    alert('Inhabilitar estudiante: ' + curso);
  }
}
