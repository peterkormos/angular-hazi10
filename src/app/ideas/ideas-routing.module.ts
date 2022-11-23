import { NewIdeaComponent } from './new-idea/new-idea.component';
import { ListIdeasComponent } from './list-ideas/list-ideas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeaResolverService } from './idea-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ListIdeasComponent
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
