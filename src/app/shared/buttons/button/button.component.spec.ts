import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {

  const createComponent = createComponentFactory({
    component: ButtonComponent,
    imports: [CommonModule],
  });
  let spectator: Spectator<ButtonComponent>;

  beforeEach(() => spectator = createComponent({
    props: {
      customeClass: 'custome-class',
      icon: '',
      newTab: false
    },
  }));

  it('should create the ButtonComponent', () => {
    const buttonComponent = spectator.component;
    expect(buttonComponent).toBeTruthy();
  });

  it('should emit when click', () => {
    let output = '';
    spectator.output('onclick').subscribe(result => (output = 'clicked'));

    spectator.component.onClickFn();
    expect(output).toEqual('clicked');
  });
});
