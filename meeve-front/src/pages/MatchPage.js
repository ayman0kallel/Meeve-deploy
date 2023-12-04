import Layout from "../components/Layout/Layout";
import TinderCard from 'react-tinder-card';
import '../match.css';
import React, { useState , useRef, useMemo, useEffect } from "react";
import CardSwipe from "../components/CardSwipe";
import logo from "../assets/img/LOGO.png";
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";


//TODO : fix boutons swipe

const MatchPage = () => {

    const [user, setUser] = useState(null);
    const [meets, setMeets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(meets.length - 1)
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        const fetchAllMeets = async () => {
            try {
                const res = await axios.get("http://localhost:5000/meets")
                setMeets(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllMeets()
    }, [])

    const childRefs = useMemo(
        () =>
        Array(meets.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0


    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (id, idx) => {
        console.log(`${id} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < meets.length) {
          await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    
    }

    return (
        <Layout>
            <div className="matchPage">
                <div className="meeve-logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="swipe-container">
                    <div className="card-container">
                        {meets.map((meet, index) =>
                        <TinderCard 
                            ref={childRefs[index]}
                            className='swipe'
                            key={meet.id}
                            onSwipe={(dir) => swiped(dir, meet.id, index)} 
                            onCardLeftScreen={() => outOfFrame(meet.id, index)} >
                            <div className="card">
                                <div className="meet-image">
                                    <img className="img-meet" src={meet.image} alt="meet-image"></img>
                                </div>
                                <CardSwipe
                                    title={meet.name}
                                    date={dayjs(meet.date).format("DD/MM/YYYY")}
                                    time={meet.time}
                                    place={meet.location}
                                />
                            </div>
                        </TinderCard>
                        )}
                    </div>
                </div>
                <div className="swipeIcon">
                    <Button onClick={() => swipe('left')}>
                        <CancelIcon className="itemIconX"></CancelIcon>
                    </Button>
                    <Button onClick={() => swipe('right')}>
                        <FavoriteIcon className="itemIconL"></FavoriteIcon>
                    </Button>
                    
                </div>
                {lastDirection ? (
                    <h2 key={lastDirection} className="infoText">
                        You swiped {lastDirection}
                    </h2>
                ) : (
                    <h2>swipe a card or press a button</h2>
                )}
            </div> 
        </Layout>
    )
}

export default MatchPage