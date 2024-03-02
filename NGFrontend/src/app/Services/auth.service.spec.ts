import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { loginDetails, registerDetails } from '../Interfaces/User';

describe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registers a user', () => {
    let mockUser: registerDetails = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@123456!76',
      areaofspecialization: 'Software Engineer',
    };

    service.registerUser(mockUser).subscribe((res) => {
      expect(res.message).toEqual('User registered successfully');
    });

    const mockReq = testingController.expectOne('http://localhost:3001/users');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toBe(mockUser);
    mockReq.flush({ message: 'User registered successfully' });
  });

  it('Logs in a user', () => {
    let mockUserDetails: loginDetails = {
      email: 'johndoe@gmail.com',
      password: '@123456!76',
    };

    service.loginUser(mockUserDetails).subscribe((res) => {
      expect(res.message).toEqual('User Logged in successfully');
    });

    const mockReq = testingController.expectOne(
      'http://localhost:3001/users/login'
    );
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toBe(mockUserDetails);
    mockReq.flush({ message: 'User Logged in successfully' });
  });
});
