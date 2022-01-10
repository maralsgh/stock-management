import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  {path: '' , component: LayoutComponent ,  children:[
      {path: 'product' , component: ProductComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
