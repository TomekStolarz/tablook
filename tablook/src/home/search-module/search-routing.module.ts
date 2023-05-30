import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{ path: '', component: SearchComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SearchRoutingModule {}
