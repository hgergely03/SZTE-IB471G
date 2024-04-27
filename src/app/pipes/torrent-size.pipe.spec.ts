import { TorrentSizePipe } from './torrent-size.pipe';

describe('TorrentSizePipe', () => {
  it('create an instance', () => {
    const pipe = new TorrentSizePipe();
    expect(pipe).toBeTruthy();
  });
});
