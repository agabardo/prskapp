import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Item } from '../../data/item.interface';
import { ProductPage } from "../product/product";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {


  items: Item[] = [];
  total = 0.00;
  qtyTotal: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage:NativeStorage, private alertCtrl:AlertController) {
    /*
    var a = {"id":1,"price":10.01,"qty":2,"title":"Product A with a larger name"};
    this.items.push(a);
    var b = {"id":2,"price":10.15,"qty":3,"title":"Product B"};
    this.items.push(b);
    var c = {"id":3,"price":10.15,"qty":3,"title":"Product C"};
    this.items.push(c);
    var d = {"id":4,"price":12.15,"qty":3,"title":"Product D"};
    this.items.push(d);
    var e = {"id":5,"price":10.15,"qty":3,"title":"Product E"};
    this.items.push(e);
    var f = {"id":6,"price":12.15,"qty":3,"title":"Product F"};
    this.items.push(f);
    //this.nativeStorage.setItem("items",this.items);
    */
  }

  removeFromCart(product:Item){
    const alert =  this.alertCtrl.create({
      title : "Remove product from cart",
      //subTitle : "Remove quote " + thisQuote.id,
      message : "Confirm product removal?",
      buttons : [{
        text:"OK",
        handler: () => {
          const position = this.items.findIndex((itemEl:Item)=>{
            return itemEl.id == product.id;
          });
          this.items.splice(position,1);
          this.nativeStorage.setItem('items',this.items).then(()=>{
              let total = 0;
              for(let i = 0; i < this.items.length; i++){
                total = total + (this.items[i].price * this.items[i].qty);
              }
              this.total = total;
              this.refreshPage();
          });
          
        },
        role : "update",
      },{
        text : "Cancel",
        role : "cancel",
      }]
    });
    alert.present();   
  }

  checkout(){
    const alert =  this.alertCtrl.create({
      title : "Procceed to Checkout",
      //subTitle : "Remove quote " + thisQuote.id,
      message : "Confirm checkout?",
      buttons : [{
        text:"OK",
        handler: () => {
          this.refreshPage();
        },
        role : "update",
      },{
        text : "Cancel",
        role : "cancel",
      }]
    });
    alert.present(); 
  }

  refreshPage() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    //this.viewCtrl.getContent();
  }


  openProduct(id:number,title:string){
    this.navCtrl.push(ProductPage, {id:id,title:title});
  } 

  ngOnInit() {
    /*
    this.nativeStorage.getItem('items').then(
      //data => console.log(data),
      data => this.items = data,
      error => console.error(error)
    );*/
  }

  
  ionViewWillEnter(){
    this.nativeStorage.getItem('items').then(
      data => {
        this.items = data;
        let total = 0;
        for(let i = 0; i < data.length; i++){
          total = total + (data[i].price * data[i].qty);
        }
        this.total = total;
      },
      error => {
        console.error(error)
      }
    );
  }

}
