import { TestBed } from "@angular/core/testing";
import { CalcService } from "./calc.service";
import { SharedService } from "./shared.service";

describe("CalcService",()=>{
let shared: SharedService;
let calc: CalcService;
beforeEach(()=>{
shared = new SharedService();
calc = new CalcService(shared);

shared = jasmine.createSpyObj("sharedService", ["mySharedFunction"])
TestBed.configureTestingModule({
  providers: [CalcService, {
    provide: SharedService, useValue: shared}]
});
shared = TestBed.inject(SharedService);
calc = TestBed.inject(CalcService);
})
  it("should multiply two numbers", ()=>{
    // const shared = new SharedService()
    // const calc = new CalcService(shared);
    const result = calc.multiply(2,3);
    expect(result).toBe(6);
  });
  it("should add two numbers", ()=>{
    // const shared = new SharedService()
    // const calc = new CalcService(shared);
    const result = calc.add(2,3);
    expect(result).toBe(5);
  });

  // it("should call the mySharedFunction func", ()=>{
  //   const shared = new SharedService()
  //   spyOn(shared,"mySharedFunction")
  //   const calc = new CalcService(shared);
  //   const result = calc.multiply(2,3);
  //   expect(shared.mySharedFunction).toHaveBeenCalled();
  // })
})