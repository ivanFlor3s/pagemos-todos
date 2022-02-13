import { Injectable } from '@angular/core';
//Model
import { Gil } from '../model/gil';

@Injectable({
  providedIn: 'root'
})
export class GilesListService {

  gilesList: Gil[] = []

  constructor() { }
}
