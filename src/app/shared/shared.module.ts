import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations:
  [],
  exports: [
    CommonModule,
    MatButtonModule
  ]
})

export class SharedModule
{}
