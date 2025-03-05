import { TestBed } from '@angular/core/testing';

import { SpellsSpacesService } from '../../../src/app/extras/spell-info/spells-spaces.service';

describe('SpellsSpacesService', () => {
  let service: SpellsSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellsSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
