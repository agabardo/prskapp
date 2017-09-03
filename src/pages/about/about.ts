import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser, private device: Device, private appAvailability: AppAvailability) {

  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      let browser = this.iab.create(httpUrl + username, '_system');
      return;
    }
    this.appAvailability.check(app).then(
      () => { // success callback
        let browser = this.iab.create(appUrl + username, '_system');
      },
      () => { // error callback
        let browser = this.iab.create(httpUrl + username, '_system');
      }
    );
  }

  openInstagram(username: string) {
	  this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', username);
  }

  openTwitter(username: string) {
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', username);
  }

  openFacebook(username: string) {
    this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://page/', 'https://www.facebook.com/', username);
  }

  openPinterest(username: string) {
    this.launchExternalApp('pinterest://', 'com.pinterest.m', 'pinterest://user/USER_NAME/', 'https://www.pinterest.com/', username);
  }

  openYouTube(username: string) {
    this.launchExternalApp('youtube://', 'com.google.android.youtube', 'youtube://user/', 'https://www.youtube.com/channel/', username);
  }

}
