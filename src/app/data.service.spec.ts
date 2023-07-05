import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { USERS } from './mockdata/users';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get all users', () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(3);
      const secondUser = users.find((user: any) => user.id === 2);
      expect(secondUser.name).toBe('Jane Doe');
    });
    const mockReq = testingController.expectOne('api/users');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(USERS));
  });


  it('should get user by ID', () => {
    service.getUserById(1).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.name).toBe('John Doe');
    });
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(USERS[1]);
  });


  it('should Update User by id', () => {
    let changes = {age : 24}
    service.updateUser(1, changes).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.id).toBe(1);
    });
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('PUT');
    let modifiedUser = USERS[1];
    modifiedUser.age = 24;
    expect(mockReq.request.body.age).toEqual(changes.age);
    mockReq.flush(modifiedUser);
  });

  
  afterEach(() => {
    testingController.verify();
  });
});
