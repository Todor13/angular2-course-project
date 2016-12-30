import { Component, OnInit } from '@angular/core';
import {ForumService} from '../../services/forum.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Rx";
import {Topic} from '../../../models/topic';
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  private subscription: Subscription;
  id: string;
  topic = new Topic();
  messages = [];
  submitted = false;
  content: string;

  constructor(private forumService: ForumService, private activatedRoute: ActivatedRoute,
              private location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.onInit();
    this.buildForm();
  }

  onInit(){
    this.subscription = this.activatedRoute.params.subscribe(
      (queryParam: any) => {
        this.id = queryParam['id'];
      });
    this.forumService.getTopicById(this.id)
      .subscribe(
        data => {
          this.topic.title = data.thread.title;
          this.topic.content = data.thread.content;
          this.topic.date = data.thread.dateTime;
          this.topic.user = data.thread.username;
          this.messages = data.thread.messages;
        });
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    this.topic = this.answerForm.value;

    this.forumService.createTopic(this.topic)
      .subscribe(
        data => this.handleRespone(data),
        err => console.log(err)
      );
  }

  handleRespone(data) {

  }

  answerForm: FormGroup;

  //
  buildForm(): void {
    this.answerForm = this.fb.group({
      'content': [this.content, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });

    this.answerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.answerForm) {
      return;
    }
    const form = this.answerForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'content': ''
  };

  validationMessages = {
    'content': {
      'required': 'Content is required.',
      'minlength': 'Content must be at least 10 characters long.',
      'maxlength': 'Content cannot be more than 500 characters long.'
    }
  };
}
