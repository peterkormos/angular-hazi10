import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() ideaId: string;
  idea: Idea;

  constructor(private ideasService: IdeasService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ideaId = id;
      }
    }
    );

    this.ideasService.getIdea(this.ideaId).subscribe(idea => this.idea = idea);
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

  listIdeas(): void {
    this.router.navigateByUrl('/ideas');
  }
}
