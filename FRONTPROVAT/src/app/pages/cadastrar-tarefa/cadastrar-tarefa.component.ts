import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/model/tarefa.model';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: "./cadastrar-tarefa.component.html",
  styleUrls: ["./cadastrar-tarefa.component.css"],
})
export class CadastrarTarefaComponent {
  tarefa = {
    titulo: '',
    descricao: '',
    categoriaId: '',
    status: '',
  };

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  cadastrar_tarefa(): void{

    if (!this.tarefa.titulo || !this.tarefa.descricao || !this.tarefa.categoriaId || !this.tarefa.status) {
      alert('Por favor, preencha todos os campos!');
      return; 
    }
    
    let tarefa: Tarefa = {
      titulo: this.tarefa.titulo,
      descricao: this.tarefa.descricao,
      categoriaId: Number(this.tarefa.categoriaId),
      status: this.tarefa.status
    }
    console.log(tarefa);

    this.client.post<Tarefa>("http://localhost:5026/api/tarefa/cadastrar", tarefa). subscribe({
      next: (tarefa) => {
        alert('Tarefa Cadastrada com sucesso!');
        this.router.navigate(['/pages/listar-tarefas']);
      },
      error: (erro)=>{
        console.log(erro);
      },
    });
  }
}
