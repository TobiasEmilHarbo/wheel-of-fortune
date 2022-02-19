import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { CommonModule } from '@angular/common';
import { IconComponent } from './icons/icon.component';
import { LoaderIconComponent } from './icons/loader-icon.component';

@NgModule({
  declarations: [IconComponent, LoaderIconComponent],
  exports: [IconComponent, LoaderIconComponent, FeatherModule],
  imports: [CommonModule, FeatherModule.pick(allIcons)],
})
export class IconsModule {}
