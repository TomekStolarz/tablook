import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';

@NgModule({
	declarations: [HomeComponent, HeaderComponent, MainComponent],
	imports: [MatButtonModule, MatIconModule, HomeRoutingModule, CommonModule],
})
export class HomeModule {}
