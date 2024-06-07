import { Component, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  mainhide:boolean = true;
  important:boolean=false;
  completed:boolean=false;

  newTask='';
  tasksList:any[] = [];
  date = new Date;
  searchText:any = '';

  //@Output() importantComp = new EventEmitter<any>();
  //@Output() completedComp = new EventEmitter<any>();

  constructor(private _todoService: TodoService){}
  ngOnInit() {
    this.getAllTasks();
  }


  all(){
    this.mainhide=true;
    this.important=false;
    this.completed=false;
    this.makeActive(event);
  }
  important1(){
    this.important=true;
    this.mainhide=false;
    this.completed=false;
    this.makeActive(event);
  }
  completed1(){
    this.completed=true;
    this.important=false;
    this.mainhide=false;
    this.makeActive(event);
  }

  // activeClass(){
  //   const sidebarLis = document.querySelectorAll('.li');
  //   sidebarLis.forEach(sidebarLi => {
  //     sidebarLi.addEventListener('click', () => {
  //       document.querySelector('.active')?.classList.remove('active');
  //       sidebarLi.classList.add('active');
  //     })
  //   })
  // }

  makeActive(event:any) {
      var previous = document.getElementsByClassName("active");
      if (previous.length > 0) {
        previous[0].className = previous[0].className.replace(" active", "");
      }
      event.target.className += " active";
  }

  addTask(){
    //console.log('addTask', this.newTask)
    this._todoService.addTask(this.newTask).subscribe(()=>{
      //console.log('added');
      this.newTask = '';
      this.getAllTasks();
    })
  }

  getAllTasks(){
    this._todoService.getAllTasks().subscribe((result:any)=>{
      //console.log(result)
      this.tasksList = result;
    })
  }

  markImportant(task:any){
    task.important = true;
    console.log(task);
    this._todoService.updateTask(task).subscribe(()=> {
      this.getAllTasks();
    })

  }

  markCoplete(task:any){
    task.completed = true;
    console.log(task);
    this._todoService.updateTask(task).subscribe(()=> {
      this.getAllTasks();
    })
  }
  
}
