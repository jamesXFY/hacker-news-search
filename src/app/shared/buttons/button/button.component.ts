import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'hns-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

  /**
   * pass custome class name to button
   */
  @Input() customeClass?: string;

  /**
   * Tells the button if there is a icon in the button, and if there is what the icon should be.
   * It takes a font awesome icon string. i.e. `far fa-external-link`. Defaults to null.
   */
  @Input() icon?: string;

  /**
   * Only important if a icon is provided. Tells the button whether the icon is on the `left` or `right`
   * of the button text. Defaults to the `right`.
   */
  @Input() iconPosition: 'left' | 'right' = 'right';

  /**
   * Tells buttons with links whether they should open a new tab or use the existing one. Defaults to false
   * aka using the existing tab.
   */
  @Input() newTab = false;

  /**
   * A event emitter for callers to bind to the onClick event of the button.
   */
  @Output() onclick: EventEmitter<any> = new EventEmitter();

  /**
   * Tells the button whether it should determine its own size based on content (`base`), shrink to
   * as small as possible (`shrink`), or take up as much width as possible (`stretch`). Defaults
   * to `base`.
   */
  @Input() size: 'base' | 'shrink' | 'stretch' = 'base';

  /**
   * Tells the button which type of button to use. Defaults to `primary`.
   */
  @Input() type: 'primary' | 'secondary' = 'primary';

  containsIcon = false;

  constructor() { }

  ngOnInit() {
    this.containsIcon = !!this.icon;
  }

  onClickFn() {
    this.onclick.emit(null);
  }
}
