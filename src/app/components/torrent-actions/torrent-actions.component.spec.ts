import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentActionsComponent } from './torrent-actions.component';

describe('TorrentActionsComponent', () => {
  let component: TorrentActionsComponent;
  let fixture: ComponentFixture<TorrentActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorrentActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorrentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
