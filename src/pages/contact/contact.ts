import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  firstname = "";
  email = "";
  message = "";

  constructor(public navCtrl: NavController, public caller:CallNumber, public http:Http, public alertCtrl: AlertController) {
  }

  

  onSubmit(formData) {
    console.log(formData.value.txtName);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let postParams = {
        name:formData.value.txtName,
        email:formData.value.txtEmail,
        message:formData.value.txtMessage
    }
    this.http.post("https://www.proski.com.au/proski-api/public/api/send-message?api_token=proskiAPI2017xxx", postParams, options)
    .subscribe(data => {
      if(data['_body']=="success"){
        this.firstname = "";
        this.email = "";
        this.message = "";
        this.showAlert("Your message was sent","Thank you for your inquiry. Our team will contact you soon.");
      }
      console.log(data['_body']);
    }, error => {
      console.log(error);// Error getting the data
    });
  }
  
  showAlert(thisTitle,thisSubtitle) {
    let alert = this.alertCtrl.create({
      title: thisTitle,
      subTitle: thisSubtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  async callProski():Promise<any>{
    try{
      await this.caller.callNumber("0249265177",true);
    }
    catch(e){
      console.log(e);
    }
  }
}
