import {inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';
import {AuthorizeStep} from 'aurelia-auth';

@inject(FetchConfig)
export class App {
  constructor(fetchConfig){
    this.fetchConfig = fetchConfig;
  }

  activate(){
      this.fetchConfig.configure();
  }

  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'todos';
    config.map([
      { route: ['', 'home'], moduleId: './modules/home/home', name: 'Home' },
      { route: 'todo', moduleId: './modules/list/todo', name: 'Todo'},
           
    ]);
  }}
  
  

