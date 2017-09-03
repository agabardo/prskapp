import { NativeStorage } from '@ionic-native/native-storage';
export class CartData {
  
  constructor(public nativStorage:NativeStorage) {
    this.nativStorage.setItem('name', 'Max');
    
  }

  getCartItems(){
      return this.nativStorage.getItem('name');
  }

  
}