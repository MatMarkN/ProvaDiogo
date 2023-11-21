import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarTarefaComponent } from './pages/cadastrar-tarefa/cadastrar-tarefa.component';
import { ListarTarefasComponent } from './pages/listar-tarefas/listar-tarefas.component';
import { ListarNaoConcluidasComponent } from './pages/listar-nao-concluidas/listar-nao-concluidas.component';

const routes: Routes = [
  {
    path : "pages/cadastrar-tarefa",
    component : CadastrarTarefaComponent
  },
  {
    path : "pages/listar-tarefas",
    component : ListarTarefasComponent
  },
  {
    path : "pages/listar-nao-concluidas",
    component : ListarNaoConcluidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
