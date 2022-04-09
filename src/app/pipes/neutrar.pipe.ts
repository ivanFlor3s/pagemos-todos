import { Pipe, PipeTransform } from '@angular/core';
import { diccionario } from '../diccionario/dic';
import { AppContextService } from '../services/app-context.service';

@Pipe({
  name: 'neutrar', pure: false
})
export class NeutrarPipe implements PipeTransform {
  constructor(public appContext: AppContextService){}

  transform(value: string, page:string, dicPath: string): string {
    if(this.appContext.familyFriendly){
      if(!page && !dicPath){
        return ''
      }
     
      return diccionario[page][dicPath];
    }
    return value;
  }

}
