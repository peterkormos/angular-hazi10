import { NewIdeaComponent } from './new-idea/new-idea.component';
import { ListIdeasComponent } from './list-ideas/list-ideas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeaResolverService } from './idea-resolver.service';
import { IdeaComponent } from './idea/idea.component';

const routes: Routes = [
  {
    path: '',
    component: ListIdeasComponent
  },
  {
    path: ':id',
    component: IdeaComponent
  },
  {
    path: 'new',
    component: NewIdeaComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {idea: IdeaResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
