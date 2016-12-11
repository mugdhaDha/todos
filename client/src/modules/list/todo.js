import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
//import {AppConfig} from '../../config/app-config';
import {Todos} from '../../resources/data/todos';
import {Users} from '../../resources/data/users';
import {DataServices} from '../../resources/data/data-services';


//@inject(Router, AuthService, AppConfig, Todos, Users, Dataservices)
@inject(Router, AuthService, Todos, Users, DataServices)
//@inject(Router, AuthService,Todos, Users, Dataservices)
export class Todo {
  DATE_FORMAT_TABLE = "MMM DD YYYY";

  //constructor(router, auth, config, todos, users, data) {
    constructor(router, auth, todos, users, data) {
    console.log("inside constructor");
	  this.router = router;
    this.auth=auth;
    this.data=data;
    this.todos=todos;
    //this.config=config;
    this.users = users;
    
    this.todoSelected = false;
    this.hideCompleted = false;
  }

     
  async activate() {
      console.log("reached in activate")
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.users.setUser(this.user);
      let serverResponse = await this.todos.getUsersTodos(this.user._id);
      console.log("reached in getUsrsTodos")
      if (serverResponse.error) {
        this.todoMessage = "Error retrieving todos"
      }
    }

  async refreshTodo(){
      this.todos.getUsersTodos(this.user._id);
    }


 newTodo(){
      this.todos.selectTodo();
      this.todoSelected = true;
    }

  async save(){
    if (this.todos.selectedTodo._id){
        await this.todos.saveTodo();
        
    }
        else{
              this.todos.selectedTodo.user = this.user._id;
              await this.todos.createTodo();
        }

        this.todoSelected = false;
      }


  async toggleDone(index){
      this.todos.todoArray[index].completed =!this.todos.todoArray[index].completed
      this.todos.selectTodo(index);
      await this.save();  
    }


  edit(index){
      this.todos.selectTodo(index);
      this.todoSelected = true;
    }

  cancel(){
           this.todoSelected = false;
    }


 togglehideCompleted(){
           this.hideCompleted = !this.hideCompleted;
    }

deleteTodo(index){
           this.todos.deleteTodo(index);
    }


 logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
   }

}
