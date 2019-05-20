export interface IAlbum {
  album_id: number;
  album_mbid: null;
  album_name: string;
  album_rating: number;
  album_track_count: number;
  album_release_date: string;
  album_release_type: string;
  artist_id: number;
  artist_name: string;
  primary_genres: {
    music_genre_list: {
      music_genre: IMusicGenre;
    }[];
  };
  secondary_genres: {
    music_genre_list: never[];
  };
  album_pline: string;
  album_copyright: string;
  album_label: string;
  updated_time: string;
  album_coverart_100x100: string;
}

export interface IMusicGenre {
  music_genre_id: number;
  music_genre_parent_id: number;
  music_genre_name: string;
  music_genre_name_extended: string;
}

export interface ITack {
  track_id: number;
  track_name: string;
  track_name_translation_list: never[];
  track_rating: number;
  commontrack_id: number;
  instrumental: number;
  explicit: number;
  has_lyrics: number;
  has_subtitles: number;
  has_richsync: number;
  num_favourite: number;
  album_id: number;
  album_name: string;
  artist_id: number;
  artist_name: string;
  track_share_url: string;
  track_edit_url: string;
  restricted: number;
  updated_time: string;
  primary_genres: {
    music_genre_list: {
      music_genre: IMusicGenre;
    }[];
  };
}

export interface IFavTrack {
  track_id: number;
  track_name: string;
  album_cover: string;
  album_name: string;
  artist_name: string;
}

export interface ITrackObject {
  track: ITack;
}

export interface ILyrics {
  lyrics_id: number;
  restricted: number;
  instrumental: number;
  lyrics_body: string;
  lyrics_language: string;
  script_tracking_url: string;
  pixel_tracking_url: string;
  lyrics_copyright: string;
  backlink_url: string;
  updated_time: any;
}

export interface ILyricsObject {
  lyrics: ILyrics;
}

export interface IAlbumObject {
  album: IAlbum;
}

export interface ITrackListObject {
  track_list: ITrackObject[];
}

export interface IResult<T> {
  message: {
    body: T;
  };
}
