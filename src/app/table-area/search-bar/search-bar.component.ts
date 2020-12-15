import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hns-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  /**
   * search input emitter
   */
  @Output() searchTextEmitter: EventEmitter<string> = new EventEmitter();

  /**
   * fire when input keyup
   * @param $event 
   */
  public onKeyUp($event: any) {
    this.searchTextEmitter.emit($event.target.value);
  }
}
