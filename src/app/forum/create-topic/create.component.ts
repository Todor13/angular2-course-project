import {Component, OnInit} from '@angular/core';
import {Topic} from '../../../models/topic';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ForumService} from '../../services/forum.service';
import {Router} from '@angular/router'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    topic = new Topic();
    message: string;

    submitted = false;

    constructor(private fb: FormBuilder, private forumService: ForumService, private router: Router) {
    }

    onSubmit() {
        this.submitted = true;
        this.topic = this.createTopicForm.value;

        this.forumService.createTopic(this.topic)
            .subscribe(
                data => this.handleRespone(data),
                err => console.log(err)
            );
    }

    handleRespone(data) {
        if (!data.result) {
            this.submitted = false;
            this.message = data.message;
        } else {
            this.message = data.result;
            setTimeout(() => this.router.navigate(['forum']), 2500)
        }
    }


    active = true;

    createTopicForm: FormGroup;



    ngOnInit(): void {
        this.buildForm();
    }

    //
    buildForm(): void {
        this.createTopicForm = this.fb.group({
            'title': [this.topic.title, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            'content': [this.topic.content, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500)
            ]]
        });

        this.createTopicForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.createTopicForm) {
            return;
        }
        const form = this.createTopicForm;

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
        'title': '',
        'content': ''
    };

    validationMessages = {
        'title': {
            'required': 'Title is required.',
            'minlength': 'Title must be at least 4 characters long.',
            'maxlength': 'Title cannot be more than 24 characters long.'
        },
        'content': {
            'required': 'Content is required.',
            'minlength': 'Content must be at least 10 characters long.',
            'maxlength': 'Content cannot be more than 500 characters long.'
        }
    };
}
