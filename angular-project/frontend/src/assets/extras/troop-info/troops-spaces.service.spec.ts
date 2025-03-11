import { TestBed } from '@angular/core/testing';

import { TroopsSpacesService } from '../../../../../public/extras/troop-info/troops-spaces.service';

describe('TroopsSpacesService', () => {
  let service: TroopsSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroopsSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
