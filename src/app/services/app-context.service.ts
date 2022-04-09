import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  familyFriendly: boolean = true;
  constructor() { }

  togglePalabras(){
    this.familyFriendly = !this.familyFriendly;
  }


}
