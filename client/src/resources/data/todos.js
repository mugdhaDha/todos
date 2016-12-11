import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
import moment from 'moment';

@inject(DataServices)
export class Todos { 
        todoArray= new Array();
	constructor(data) {
        		this.data = data;
	    	}

 async saveTodo(){ 
          try {
            let serverResponse = await this.data.put(this.selectedTodo, this.data.TODO_SERVICE);
	        if(!serverResponse.error) {
                  this.todoArray[this.selectedIndex] = serverResponse;
	            }
	        return serverResponse;
        } catch (error) {
            	console.log(error);
            	return undefined;
        }
 }


	async getUsersTodos(id) {
        var url = this.data.TODO_SERVICE + '/usertodos/' + id + '?order=dueDate';
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.todoArray = serverResponse;
            }
       } catch (error) {
            console.log(error);
            return undefined;
        }
        return this.todoArray;
   }

   async deleteTodo(index) {
        console.log("printing delete id: " + index);
        this.data.delete (this.data.TODO_SERVICE + '/' + this.todoArray[index]._id);
        this.todoArray.splice(index, 1);
       }

  async createTodo(){ 
        console.log("inside create todo: " + this.selectedTodo)
        try {
            let serverResponse = await this.data.post(this.selectedTodo, this.data.TODO_SERVICE);
	        if(!serverResponse.error) {
                   this.todoArray.unshift(serverResponse);
	            }
	        return serverResponse;
        } catch (error) {
            	console.log(error);
            	return undefined;
        }
 }

  async selectTodo(index){ 
      console.log("inside selectTodo index:" + index)
        if (!index && index !=0)
        { this.selectedTodo= {
            task:"",
            priority: "",
            dueDate: moment(new Date()).format("YYYY-MM-DD"),
            dueEntered: moment(new Date()).format("YYYY-MM-DD")
            }
        } else {
            this.selectedIndex = index;
            this.selectedTodo = {
                _id: this.todoArray[index]._id,
                task: this.todoArray[index].task,
                dueDate: moment(this.todoArray[index].dueDate).format("YYYY-MM-DD"),
                dateEntered: moment(this.todoArray[index].dateEntered).format("YYYY-MM-DD"),
                priority: this.todoArray[index].priority,
                completed: this.todoArray[index].completed
            }
          }
         }
        };
