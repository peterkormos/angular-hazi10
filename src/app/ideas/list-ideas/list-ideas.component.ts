import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.scss']
})
export class ListIdeasComponent implements OnInit {
  ideas: Idea[] = [];

  constructor(private ideasService: IdeasService, private router: Router) { }

  ngOnInit(): void
  {
    this.listIdeas();
  }
  listIdeas()
  {
    this.ideasService.listIdeas().subscribe(ideas => this.ideas = ideas);
  }

  upvote(idea: Idea) {
    this.ideasService.upvoteIdea(idea).subscribe(_ => this.listIdeas());
  }

  downvote(idea: Idea) {
    this.ideasService.downvoteIdea(idea).subscribe(_ => this.listIdeas());
  }

  delete(idea: Idea) {
    this.ideasService.deleteIdea(idea).subscribe(_ => this.listIdeas());
  }

  editIdea(idea: Idea) {
    this.router.navigateByUrl(`/ideas/new?id=${idea.id}`)
  }
}
