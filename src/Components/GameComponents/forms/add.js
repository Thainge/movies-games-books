import React, { useEffect, useState } from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import Autosuggest from 'react-autosuggest';
import styles from './form.module.css';
import { steamGames, mockGame } from '../../../data/games';
import InputItem from '../Other/inputItem';
import { useParams } from 'react-router-dom';
import localStorage from 'local-storage';

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : steamGames.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const renderSuggestion = (suggestion) => {
    return <div className={styles.formDropDown}>
        {suggestion.name}
    </div>
}

const getSuggestionValue = suggestion => suggestion.name;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function AddModalGames({ setAddModalState, adding }) {
    const obj = ContextFunction();
    const { allGames, setAllGames } = obj;

    let { id } = useParams();

    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    function closeModal() {
        setAddModalState(false);
    }

    const fetchSteamData = async (id) => {
        try {
            const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&api_key=322E3721E0A0985995B5F90CB309C308`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            });
            const json = await response.json();
            return json[id].data;
        }

        catch (err) {
            console.log(err)
        }
    }

    const SubmitEverything = async (e) => {
        e.preventDefault();
        const newArr = [];

        setLoading(() => true);
        try {
            await asyncForEach(results, async (item) => {
                const data = await fetchSteamData(item.appid);
                newArr.push(data);
            });

            setAllGames((prevGames) => {
                let newGames = [...prevGames];

                let newFinishedItems = [];
                newArr.forEach((item, index) => {
                    if (item) {
                        let link = `https://store.steampowered.com/app/${item.steam_appid}`;
                        let header = `https://cdn.akamai.steamstatic.com/steam/apps/${item.steam_appid}/header.jpg`
                        let poster = `https://cdn.akamai.steamstatic.com/steam/apps/${item.steam_appid}/page_bg_generated_v6b.jpg`
                        let newItem = {
                            id: item.steam_appid,
                            title: item.name,
                            poster_path: poster,
                            header: header,
                            background: item.background,
                            images: item.screenshots,
                            movies: item.movies,
                            overview: item.short_description,
                            link: link
                        };

                        newFinishedItems.push(newItem);
                    }
                });

                if (adding) {
                    newGames.forEach((item, index) => {
                        let id1 = id.toString();
                        let id2 = item.id.toString();
                        if (id1 === id2) {
                            try {
                                newFinishedItems.forEach((data, index) => {
                                    const exists = item.FinishedData.find(a => a.id === data.id)
                                    if (exists) {
                                        newFinishedItems.splice(index, 1);
                                    }
                                });
                            } catch (err) {
                                console.log(err)
                            }

                            let newItemArr = {
                                ...item,
                                FinishedData: [...item.FinishedData, ...newFinishedItems]
                            }
                            newGames[index] = newItemArr;
                        }
                    });
                } else {
                    let newID = (allGames.length + 1);
                    let newItemArr = {
                        id: newID,
                        folderName: text,
                        FinishedData: [...newFinishedItems]
                    }
                    newGames.push(newItemArr)
                }

                localStorage.set('games', newGames);
                return newGames
            });
        } catch (err) {
            console.log(err)
        }

        setLoading(() => false);
        setText('');
        setResults([]);
        closeModal();
    }

    const [loading, setLoading] = useState(false);

    const onChange = (event, { newValue }) => {
        setSearchValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search for a game',
        value: searchValue,
        onChange: onChange
    };

    const [results, setResults] = useState([]);

    const onSuggestionSelected = (event, { suggestion }) => {
        setResults((prev) => {
            let newResults = [...prev];
            let isDuplicate = false;

            newResults.forEach((item, index) => {
                if (item.appid === suggestion.appid) {
                    isDuplicate = true;
                }
            })
            if (!isDuplicate) {
                newResults.push(suggestion);
            }
            return newResults;
        })
        setSearchValue('');
    }

    const deleteInputItem = (index) => {
        setResults((prev) => {
            let newResults = [...prev];
            newResults.splice(index, 1);
            return newResults;
        })
    }
    const [text, setText] = useState('');

    return (
        <form onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={SubmitEverything} className={styles.flexCenterGame}>
            <div className={styles.formContainer}>
                <div className={styles.inputFormContainer}>
                    {
                        adding ? <></> : <div className={styles.textContainer}>
                            <label htmlFor="text" className={styles.nameText}>
                                Name:
                            </label>
                            <input type="text" required onChange={(e) => setText(e.target.value)} placeholder={'Name'} className={styles.nameInput} />
                        </div>
                    }
                    <div className={styles.textInfo}>Games: </div>
                    <Autosuggest
                        theme={styles}
                        onSuggestionSelected={onSuggestionSelected}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                    <div className={styles.resultSelected}>{results.length === 1 ? `${results.length} game selected` : `${results.length} games selected`}</div>
                    <div className={styles.results}>
                        {
                            results.map((item, index) => (
                                <InputItem key={index} item={item} index={index} deleteInputItem={deleteInputItem} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.delete} onClick={closeModal}>Cancel</div>
                <input type={'submit'} className={`${loading ? styles.disabledEdit : styles.edit}`} value='Submit' />
                {
                    loading ? <div className={styles.loadingBox}>
                        <img src={require('../../../assets/loading.gif')} className={styles.imageLoading}></img>
                    </div> : <></>
                }
            </div>
        </form>
    );
}

export default AddModalGames;