import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    imports:      [ ReactiveFormsModule, CommonModule, BrowserModule ],
    declarations: [ RegisterComponent ],
    exports:      [ RegisterComponent ]
})
export class RegisterModule { }

