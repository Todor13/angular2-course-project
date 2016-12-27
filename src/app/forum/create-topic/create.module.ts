import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';


@NgModule({
    imports:      [ ReactiveFormsModule, CommonModule ],
    declarations: [ CreateComponent ],
    exports:      [ CreateComponent ]
})
export class CreateModule { }

