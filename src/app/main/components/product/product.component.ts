import { Component, OnInit } from '@angular/core';
import {ProductSService} from "../../services/product-s.service";
import {Product} from "../../models/Product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = {};
  loading: boolean = false;
  constructor(private service: ProductSService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.get(1).catch(() => {
      this.openSnackBar('Something wrong!' , 'Close');
    });
    this.service.getProductSubscription().subscribe(data => {
      this.product = data;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogComponent , {
      width: '500px',
      data:{
        type : 'add',
        title: 'Increase Product',
        text: 'Please fill the form with desired number'

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loading = true;
        this.service.Refill(1, result).then((res) => {
          this.service.updateDataSubscription(<Product>res);
          this.openSnackBar(`You have add ${result} product to stock` , 'Close');
        }).catch(() => this.openSnackBar('Something went wrong' , 'Close'))
          .finally(() => this.loading = false);
      }
    });
  }

  openDialogRemove(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        type : 'buy',
        title: 'Purchase Product',
        text: 'Please fill the form with desired number'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loading = true;
        this.service.buy(1, result).then((res) => {
          this.service.updateDataSubscription(<Product>res);
          this.openSnackBar(`You have bought ${result} product` , 'Close');
        }).catch(error => this.openSnackBar(error.error , 'Close'))
          .finally(() => this.loading = false);
      }
    });
  }

}
