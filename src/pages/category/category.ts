import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductPage } from "../product/product";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage{

  id:number;
  title:string;
  products:any;
  fakeCacheProducts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    loader.present();
    this.id = this.navParams.get('id');
    this.title = this.navParams.get('title');
    this.http.get('https://www.proski.com.au/proski-api/public/api/viewcategory/'+this.id+"?api_token=proskiAPI2017xxx").map(res => res.json()).subscribe(data => {
        this.products = data;
        this.fakeCacheProducts = data;
        loader.dismiss();
        //console.log(data);
    });
  }


  getItems(ev: any) {

    // Reset items back to all of the items
    this.products = this.fakeCacheProducts;

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    //if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
          return true;
        }
        return false;
      });
    }
  }


  openProduct(id:number,title:string){
    //console.log(id+" : " +title);
    this.navCtrl.push(ProductPage, {id:id,title:title});
  }

}
