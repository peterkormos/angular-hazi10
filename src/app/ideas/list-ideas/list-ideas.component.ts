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
    console.log('ngOnInit()...');
    this.listIdeas();
  }
  listIdeas()
  {
    this.ideasService.listIdeas().subscribe(ideas => this.ideas = ideas);
  }
}
