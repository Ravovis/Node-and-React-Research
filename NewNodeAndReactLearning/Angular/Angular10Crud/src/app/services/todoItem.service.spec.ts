import { TestBed } from '@angular/core/testing';

import { TodoItemService } from './todoItem.service';

describe('TodoItemService', () => {
  let service: TodoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
