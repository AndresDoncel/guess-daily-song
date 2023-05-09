export interface  DailySong {
  id: string
  date: string,
  options: SongOption[],
  correctAnswer: string,
  song: Song
}

export interface SongOption {
  id: string,
  audio: string,
  correctOptionSelected?: boolean
}

export interface Song {
  name: string,
  spotifySong: string,
  youtubeLink: string,
  imageAlbumLink: string,
}
