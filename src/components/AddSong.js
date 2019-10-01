import React, { useState, useContext } from "react";
import { Mutation } from "react-apollo";
import { ADD_SONG } from '../graphql/mutations'
import Container from "muicss/lib/react/container";
import Context from '../context';


const AddSong = () => {
    const [name, setName] = useState("");
    const [actor, setActor] = useState("");
    const [lyrics, setLyrics] = useState("");
    const {dispatch} = useContext(Context);

    return (
        <Mutation mutation={ADD_SONG}>
            {(addSong) => (
        <form className={'mui-form'} onSubmit={e => {
            e.preventDefault();
            addSong({ variables: { song: {
                        name,
                        actor,
                        lyrics
                        }}
                    });
            const songs = [{name, actor, lyrics}];
            dispatch({type: "ADD_CONTENT", payload: songs});
            setName("");
            setLyrics("");
            setActor("");
        }}>
                <legend>Add a new song</legend>
                <div className={'mui-textfield mui-textfield--float-label width-small'}>
                    <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} />
                    <label>Name</label>
                </div>
                <div className="mui-textfield mui-textfield--float-label width-small">
                <input value={actor} type="text" name="actor" onChange={e => setActor(e.target.value)}/>
                    <label>Singer</label>
                </div>
                <div className="mui-textfield mui-textfield--float-label">
                    <textarea value={lyrics} type="text" name="lyrics" onChange={e => setLyrics(e.target.value)}/>
                    <label>Lyrics</label>
                </div>
            <button className={`mui-btn mui-btn--raised mui-btn--primary`} type="submit"> Add Song </button>
        </form>
            )}
        </Mutation>
    )
}

export default AddSong