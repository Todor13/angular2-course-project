import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router'


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    confirmPassword: string;
    emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    user = new User();
    submitted = false;
    message: string;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    }

    onSubmit() {
        this.submitted = true;
        this.user = this.userForm.value;

        this.userService.register(this.user)
            .subscribe(
                data => this.handleRespone(data),
                err => console.log(err)
            );
    }

    handleRespone(data) {
        if (data.message) {
            this.submitted = false;
            this.message = data.message;
        } else {
            this.message = data.result;
            setTimeout(() => this.router.navigate(['login']), 3500)
        }
    }

    active = true;

    userForm: FormGroup;


    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'username': [this.user.username, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
            ]],
            'firstname': [this.user.firstname, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
            ]],
            'lastname': [this.user.lastname, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
            ]],
            'email': [this.user.email, [
                Validators.required,
                Validators.pattern(this.emailRegex)
            ]],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15)
            ]],
            'confirmPassword': [this.confirmPassword, [
                Validators.required
            ]]
        });

        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            //console.log(control.errors);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'username': '',
        'firstname': '',
        'lastname': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    validationMessages = {
        'username': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 3 characters long.',
            'maxlength': 'Username cannot be more than 15 characters long.'
        },
        'firstname': {
            'required': 'First name is required.',
            'minlength': 'First name must be at least 3 characters long.',
            'maxlength': 'First name cannot be more than 15 characters long.'
        },
        'lastname': {
            'required': 'Last name is required.',
            'minlength': 'Last name must be at least 3 characters long.',
            'maxlength': 'Last name cannot be more than 15 characters long.'
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Email is not in valid format.'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least 6 characters long.',
            'maxlength': 'Password cannot be more than 15 characters long.'
        },
        'confirmPassword': {
            'required': 'Please re-enter your password'
        }
    };

}