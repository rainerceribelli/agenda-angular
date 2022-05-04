import {MatSort, Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface user {
  userName: string;
  fone: string;
  
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    
  columnsToDisplay: string[] = ["userName", "fone", 'actions']
  public newUser = {userName: "", fone:""}; //setando os campos do input antes que seja digitalizado
  public myDataArray!: any;
  

  ; //utilizado para receber os dados (Nome e telefone)
  public USER_DATA: user[] = [
    
  ];

    
  addUser() { //adicionar um novo user (nome e telefone)
    if(this.newUser.userName!=""&&this.newUser.fone!=""){
      const newUsersArray = this.USER_DATA;
      newUsersArray.push(this.newUser);
      this.myDataArray = [...newUsersArray];
      this.newUser = {userName: "", fone:""};
    console.warn(this.myDataArray);
    }else{
      Swal.fire('Favor preencher os dois campos!', 'error')
    }
  }
  limpar(){
    this.newUser.userName = "";
    this.newUser.fone = "";
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }
  

  @ViewChild(MatSort) sort: MatSort | undefined;

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
      return value.userName != row_obj.userName;
    });
    this.myDataArray = [...this.USER_DATA];
  }

  sortedData!: user[];

  constructor(public dialog: MatDialog) {
    this.sortedData = this.USER_DATA.slice()
    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA.slice()]);
  }

  sortData(sort: Sort) {
    const data = this.USER_DATA.slice();
    if(!sort.active || sort.direction === ''){
      this.myDataArray = data;
      return;

    }

    this.myDataArray = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'userName':
          return compare(a.userName, b.userName, isAsc);
        case 'fone':
          return compare(a.fone, b.fone, isAsc);
        default:
          return 0;    
      }
      
    });
  }

  openDialog(row_obj:any): void {
  
  }

  ngOnInit() {
    
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
