import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {InputClearableExample} from './input-clearable-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MemberFormComponent } from './member-form/member-form.component';
import { SimpleCvaComponent } from './simple-cva/simple-cva.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MembersComponent } from './members/members.component';
import { FormControlHintDirective } from './form-control-hint.directive';

@NgModule({
  declarations: [InputClearableExample, MemberFormComponent, MembersComponent, SimpleCvaComponent, FormControlHintDirective],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatIconModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  bootstrap: [InputClearableExample],
})
export class AppModule {
  constructor() {
    console.clear();
  }
}
