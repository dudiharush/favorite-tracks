import React, { useEffect, useState } from "react";
import axios from "axios";
import { ILyrics, ITack } from "../type";
import { Button } from "react-bootstrap";

export const TrackPage = props => {
  const { trackId } = props.match.params;
  const [trackData, setTrackData] = useState<ITack>();
  const [trackLyrics, setTrackLyrics] = useState<ILyrics>();

  useEffect(() => {
    Promise.all([
      axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${trackId}&apikey=7629dddb1ec68ae1209b400db720c6ec`
      ),
      axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=7629dddb1ec68ae1209b400db720c6ec`
      )
    ]).then(
      axios.spread((trackRes, lyricsRes) => {
        setTrackData(trackRes.data.message.body.track);
        setTrackLyrics(lyricsRes.data.message.body.lyrics);
      })
    );
  }, [trackId]);

  if (!trackData) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <b>{trackData.track_name}</b>
      </div>
      <div>
        Artist Name: <b>{trackData.artist_name}</b>
      </div>
      <div>
        Album Name: <b>{trackData.album_name}</b>
      </div>
      <div>
        Rating: <b>{trackData.track_rating}</b>
      </div>
      {trackLyrics && (
        <>
          <div>lyrics:</div>
          <div
            style={{
              maxWidth: "200px",
              maxHeight: "300px",
              overflowY: "scroll",
              border: "1px solid black"
            }}
          >
            {trackLyrics.lyrics_body}
          </div>
        </>
      )}
      <Button
        onClick={() => {
          props.history.push("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
};
