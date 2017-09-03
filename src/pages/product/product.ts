import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Item } from '../../data/item.interface';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage implements OnInit{

  id: number;
  title: string;
  price: number;
  details: any;
  qty = 1;
  items: Item[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public loadingCtrl: LoadingController, 
    private nativeStorage:NativeStorage,
    public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductPage');
  }

  ngOnInit() {
    this.nativeStorage.getItem('items').then(
      data => this.items = data,
      error => console.error(error)
    );
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
    loader.present();
    this.qty = 1;
    this.id = this.navParams.get('id');
    this.title = this.navParams.get('title');
    this.http.get('https://www.proski.com.au/proski-api/public/api/product/'+this.id+"?api_token=proskiAPI2017xxx").map(res => res.json()).subscribe(data => {
    //this.http.get('http://localhost/api/proski-api/public/product/'+this.id).map(res => res.json()).subscribe(data => {
        this.details = data;
        this.price = data[0].price; 
        loader.dismiss();
    });
  }

  addToCart(){
    this.items.push({"id":this.id,"price":this.price,"qty":this.qty,"title":this.title});
    this.nativeStorage.setItem("items",this.items);
    const alert = this.alertCtrl.create({
      title: 'Added to cart!',
      subTitle: 'Product ' + this.title + ' was added to your cart.',
      buttons: ['OK']
    });
    alert.present();
    //console.log("Add product to cart: id " + this.id + " qty " +  this.qty);
  }

  

  qtyIncrease(){
    this.qty++;
  }

  qtyDecrease(){
    this.qty--;
  }

}
