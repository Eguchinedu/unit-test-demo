import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
let el: DebugElement;
let component: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'unit-test-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unit-test-demo');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('unit-test-demo app is running!');
  // });
  it('should render a button with text subscribe', () => {
    component.isSubscribed = false;
    fixture.detectChanges();
    const btnElements = el.queryAll(By.css('.subscribe'));
    // component.btnText = 'subscribe';
    expect(btnElements[0].nativeElement.textContent).toBe('Subscribe')
    expect(btnElements[0].nativeElement.disabled).toBeFalse();
  });
  // it('should render a button with text subscribe and disabled property to be true', (done: DoneFn) => {
  //   component.isSubscribed = false;
  //   fixture.detectChanges();
  //   let btnElements = el.queryAll(By.css('.subscribe'));
  //   // component.btnText = 'subscribe';
  //   btnElements[0].nativeElement.click()
  //   setTimeout(() => {
  //     fixture.detectChanges();
  //     btnElements = el.queryAll(By.css('.subscribe'));
  //     expect(btnElements[0].nativeElement.textContent).toBe('Subscribed')
  //     expect(btnElements[0].nativeElement.disabled).toBeTrue();
  //     done();
  //   }, 3000)
  // })
  it('should render a button with text subscribe and disabled property to be true', fakeAsync(() => {
    component.isSubscribed = false;
    fixture.detectChanges();
    let btnElements = el.queryAll(By.css('.subscribe'));
    // component.btnText = 'subscribe';
    btnElements[0].nativeElement.click()
    setTimeout(() => {
      console.log('some other test case');
      
    }, 8000)
    setTimeout(() => {
      fixture.detectChanges();
      btnElements = el.queryAll(By.css('.subscribe'));
      
    }, 3000);
    // tick(3000)
    flush();
    expect(btnElements[0].nativeElement.textContent).toBe('Subscribed');
    expect(btnElements[0].nativeElement.disabled).toBeTrue();
    // tick(5000)
  }));

  it("should test a promise", fakeAsync(()=>{
    let counter = 0;
    setTimeout(() => {
      counter = counter + 2;
    }, 2000);
    setTimeout(() => {
      counter = counter + 3;
    }, 3000);

    Promise.resolve().then(() => {
counter = counter + 1;
    });
    flush();
    expect(counter).toBe(6);
  }))
});
