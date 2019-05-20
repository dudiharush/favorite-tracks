import React, { useState } from "react";
import axios from "axios";
import { IFavTrack, IAlbumObject, IResult, ITrackListObject } from "../type";
import { Button, Image, Modal, Dropdown, Spinner } from "react-bootstrap";
export const Home = props => {
  const [inputText, setInputText] = useState("");
  const [trackIdToDelete, setTrackIdToDelete] = useState();
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const [favTracks, setFavTracks] = useState<IFavTrack[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState("album_name");

  const onInputChange = e => {
    setInputText(e.target.value);
  };

  const removeTrackById = (trackId: number) => {
    setFavTracks(state => {
      const filtered = state.filter(favTrack => favTrack.track_id !== trackId);
      return [...filtered];
    });
  };

  const addTrack = () => {
    setIsLoadingTrack(true);
    axios
      .get<IResult<ITrackListObject>>(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${inputText}&apikey=7629dddb1ec68ae1209b400db720c6ec`
      )
      .then(res => {
        if (res.data && res.data.message.body.track_list[0]) {
          const trackData = res.data.message.body.track_list[0].track;
          axios
            .get<IResult<IAlbumObject>>(
              `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.get?album_id=${
                trackData.album_id
              }&apikey=7629dddb1ec68ae1209b400db720c6ec`
            )
            .then(res => {
              const albumData = res.data.message.body.album;
              const track: IFavTrack = {
                track_id: trackData.track_id,
                track_name: trackData.track_name,
                album_cover: albumData.album_coverart_100x100,
                album_name: albumData.album_name,
                artist_name: albumData.artist_name
              };
              if (
                !favTracks.some(
                  favTrack => favTrack.track_id === track.track_id
                )
              ) {
                setFavTracks(state => [track, ...state]);
              }
              setIsLoadingTrack(false);
            });
        }
      });
  };

  const onSelect = (sortFieldName: string) => {
    setSortField(sortFieldName);
    setFavTracks(state =>
      state.sort((a, b) => {
        if (a[sortField] > b[sortField]) return 1;
        if (a[sortField] < b[sortField]) return -1;
        return 0;
      })
    );
  };

  return (
    <div className="App">
      <div className="d-flex">
        <div style={{ width: "300px" }} className="d-flex">
          <input
            placeholder="Enter track name"
            type="text"
            style={{ width: "200px" }}
            value={inputText}
            onChange={onInputChange}
          />
          {isLoadingTrack ? (
            <Spinner animation="border" />
          ) : (
            <Button variant="primary" onClick={addTrack}>
              Add Tack
            </Button>
          )}
        </div>
        <div>
          <Dropdown onSelect={onSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["artist_name", "album_name", "track_name"].map(
                (soryBy: string) => {
                  return (
                    <Dropdown.Item eventKey={soryBy} key={soryBy}>
                      {soryBy.replace("_name", "")}
                    </Dropdown.Item>
                  );
                }
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {favTracks &&
          favTracks.map(track => (
            <div
              className="fav-track"
              key={track.track_id}
              onClick={() => {
                props.history.push({
                  pathname: `/track/${track.track_id}`
                });
              }}
            >
              <div
                className="remove-fav-track"
                onClick={e => {
                  setTrackIdToDelete(track.track_id);
                  setShowModal(true);
                  e.stopPropagation();
                }}
              >
                X
              </div>
              <Image
                src={track.album_cover}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey"
                }}
              />
              <div>
                <div
                  style={{
                    maxWidth: "100px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {track.artist_name}
                </div>
                <div
                  style={{
                    maxWidth: "100px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {track.album_name}
                </div>
                <div
                  style={{
                    maxWidth: "100px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {track.track_name}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Remove Track From Favorites?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              removeTrackById(trackIdToDelete);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
