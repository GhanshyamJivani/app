import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  addTask(task:string){
    return this._http.post('http://localhost:3000/tasks', {
      title:task
    })
  }

  getAllTasks(){
    return this._http.get('http://localhost:3000/tasks')
  }

  updateTask(task:any){
    return this._http.put('http://localhost:3000/tasks/' + task.id, task)
  }


}
