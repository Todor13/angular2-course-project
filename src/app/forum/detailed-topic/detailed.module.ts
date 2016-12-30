import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailedComponent } from './detailed.component';


@NgModule({
  imports:      [ ReactiveFormsModule, CommonModule ],
  declarations: [ DetailedComponent ],
  exports:      [ DetailedComponent ]
})
export class DetailedModule { }

