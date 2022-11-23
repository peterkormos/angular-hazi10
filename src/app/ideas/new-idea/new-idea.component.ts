import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit {
  form1: FormGroup;
  isLoading: boolean = false;
  isEditing: boolean;
  ideaId: string;

  constructor(private ideasService: IdeasService, private router: Router, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.form1 = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    activatedRoute.data.subscribe(data => {
      this.isEditing = !!data.idea;
      if (this.isEditing) {
        this.ideaId = data.idea.id;
        this.form1.setValue({
          name: data.idea.name,
          description: data.idea.description
        });
      } else {
      this.form1.reset();
      }
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const request = this.isEditing ? this.ideasService.updateIdea(this.ideaId, this.form1.value.name, this.form1.value.description) :
      this.ideasService.createIdea(this.form1.value.name, this.form1.value.description);

      request
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => this.router.navigateByUrl('/ideas'),
        error: () => this.snackBar.open('An error occured during submit', 'OK', { duration: 5000 })
      }
      );
  }
}
