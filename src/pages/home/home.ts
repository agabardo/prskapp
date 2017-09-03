import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CategoryPage } from "../category/category";
import { LoadingController } from 'ionic-angular';
import menuEntries from "../../data/datamenu";
import { MenuItem} from "../../data/menu.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  menuItems: MenuItem[] = [];

  categories: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.initializeItems();
  }

  initializeItems() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    /*
    this.http.get('https://www.proski.com.au/proski-api/public/api/categories?api_token=proskiAPI2017xxx').map(res => res.json()).subscribe(data => {
        this.categories = data;
        loader.dismiss();
    });*/
    this.menuItems = menuEntries;
    loader.dismiss();
  }



  getItems(ev: any) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    //if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.menuItems = this.menuItems.filter((item) => {
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
          return true;
        }
        return false;
      });
    }
  }
  /*
  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.http.get('https://www.proski.com.au/proski-api/public/api/categories?api_token=proskiAPI2017xxx').map(res => res.json()).subscribe(data => {
        this.categories = data;
        loader.dismiss();
    });
  }*/

  openCategory(id:number,title:string){
    //console.log(id + " : " + title);
    this.navCtrl.push(CategoryPage, {id:id,title:title});
  }

}
