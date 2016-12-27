import {Component, OnInit} from '@angular/core';
import {Topic} from '../../../models/topic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
    topic = new Topic();

    submitted = false;

    onSubmit() {
        this.submitted = true;
        this.topic = this.createTopicForm.value;
    }

    active = true;

    createTopicForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

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
