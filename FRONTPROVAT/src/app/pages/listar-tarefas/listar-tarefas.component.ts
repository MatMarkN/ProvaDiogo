import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/model/tarefa.model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: "./listar-tarefas.component.html",
  styleUrls: ["./listar-tarefas.component.css"],
})
export class ListarTarefasComponent {

  constructor(private client: HttpClient, private router: Router,   private snackBar: MatSnackBar){
  }

  tarefa: Tarefa[] = [];
  
  ngOnInit() : void{
    this.client.get<Tarefa[]>("http://localhost:5026/api/tarefa/listar").subscribe({
      next: (tarefa) =>{
        this.tarefa = tarefa;
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

}
