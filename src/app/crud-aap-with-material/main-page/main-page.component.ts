import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../../services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _snackBar : SnackbarService ){}

  ngOnInit(){
    this.getEmployeeList()
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })

  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
        //console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error:(err:any)=>{
        console.error(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    if(confirm('Arey want to delete?'))
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        // alert('Employee deleted');
        this._snackBar.openSnackBar('Employee deleted', 'Done..')
        this.getEmployeeList();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  openEditForm(detail:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data : detail,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }


}
