import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSupperGuard } from './auth-supper.guard';

describe('AuthSupperGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSupperGuard]
    });
  });

  it('should ...', inject([AuthSupperGuard], (guard: AuthSupperGuard) => {
    expect(guard).toBeTruthy();
  }));
});
