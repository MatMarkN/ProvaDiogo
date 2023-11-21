import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/model/tarefa.model';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: "./listar-nao-concluidas.component.html",
  styleUrls: ["./listar-nao-concluidas.component.css"],
})
export class ListarNaoConcluidasComponent {

  constructor(private client: HttpClient, private router: Router,   private snackBar: MatSnackBar){
  }

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client.get<Tarefa[]>("http://localhost:5026/api/tarefa/naoconcluidas").subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas.filter(tarefa => tarefa.status === 'Em andamento' || tarefa.status === 'Não iniciada');
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

}
