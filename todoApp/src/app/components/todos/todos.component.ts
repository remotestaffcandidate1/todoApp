import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoItem:string;
  todoEditItem:any;
  todolist:any;
  todochecklist:any;
  todocompleted:boolean;
  todoCompleted:number;
  todoEdit:boolean;
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.todoItem = '';
    this.todoEditItem = {
      item: '',
      index:0
  };
    this.todolist = [];
    this.todocompleted = false;
    this.loadList();
    this.checkItems();
    this.todoCompleted = 0;
    this.todoEdit = false;
  }
  addToDo(event){
    if(this.todoItem !== ''){//prevent empty rows
       if(this.todocompleted){
      this.todochecklist = {
        todoItem: this.todoItem,
        completed:true
    }
    }else{
      this.todochecklist = {
        todoItem: this.todoItem,
        completed:false
    }
    }
      this.todolist.unshift(this.todochecklist); //directly push the data to arraylist without API validation due to time limitation

       // post data to Dingo API
      this.http.get('http://localhost:8000/api/addlist').subscribe(data => { //revert to get since its just a dummy add to api
        console.log('Add to Todo list response from Dingo API: ',data); //get response
      //perform additional checking here, if data is successfully added, 
      // proceed with pushing the item to the todochecklist
      });
      this.todoItem = ''; //reset to blank
      event.preventDefault();
    }
  }

  removeToDo(index){
    this.todolist.splice(index,1);
  }

  markAll(checkstatus){
    if(!checkstatus){
      for(var i = 0; i < this.todolist.length;i++) {
        this.todolist[i].completed = true;
      }
      this.todocompleted = true;
    }else{
      for(var i = 0; i < this.todolist.length;i++) {
        this.todolist[i].completed = false;
      }
      this.todocompleted = false;
    }

  }

  clearCompleted(){
    for(var i = 0; i < this.todolist.length;i++) {
      this.todolist[i].completed = false; //set all as false
    }
  }

  checkItems(){
    let xnum = 0;
    setTimeout(() => {
      for(var i = 0; i < this.todolist.length;i++) {
        if( this.todolist[i].completed == true){
          xnum++;
        }

        
      }
      this.todoCompleted = xnum; // checked items
      this.checkItems();
  
    }, 1000);
  }

  setEditItems(index,oldVal){
    this.todoEditItem = {
      item: oldVal,
      index:index
  };
  this.todoEdit = true;
  }
  editItems(newVal){
    if(this.todoEditItem.item !== ''){//prevent empty rows
    this.todolist[this.todoEditItem.index].todoItem = newVal;

    this.todoEditItem = {
      item: '',
      index:0
  };
  this.todoEdit = false;

}
  }

loadList(){
    // post data to Dingo API
    this.http.get('http://localhost:8000/api/showlist').subscribe(result => {
       var items = JSON.parse(JSON.stringify(result)); //parse to convert object from api to json
      if(items.data.length > 0){ //only load to view if there is response from API
        for(var i = 0; i < items.data.length;i++){
          this.todochecklist = {
          todoItem: items.data[i].todoItem,
          completed:items.data[i].completed
      }
        this.todolist.unshift(this.todochecklist); 

        }
      }
   

   

  });
}
  


}
