import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { CommonModule } from '@angular/common';
import { IconComponent } from './icons/icon.component';
import { LoaderIconComponent } from './icons/loader-icon.component';
import { CheckIconComponent } from './icons/check-icon.component';

@NgModule({
  declarations: [IconComponent, CheckIconComponent, LoaderIconComponent],
  exports: [
    IconComponent,
    CheckIconComponent,
    LoaderIconComponent,
    FeatherModule,
  ],
  imports: [CommonModule, FeatherModule.pick(allIcons)],
})
export class IconsModule {}
