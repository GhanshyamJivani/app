import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  tasksList:any[] = [];

  constructor(private _todoService: TodoService){}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    this._todoService.getAllTasks().subscribe((result:any)=>{
      //console.log(result)
      this.tasksList = result.filter((x:any)=> x.completed == true);
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
    task.completed = true
    console.log(task);
    this._todoService.updateTask(task).subscribe(()=> {
      this.getAllTasks();
    })
  }
}
