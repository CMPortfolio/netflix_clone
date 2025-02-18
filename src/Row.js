import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import Youtube from "react-youtube"; // ✅ Correct YouTube Import

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState(""); // ✅ Fix: Define State

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl(""); // ✅ Close the trailer if clicked again
        } else {
            try {
                const apiKey = "b4d0078c9903d76706f757722324eaa7"; // ✅ Your TMDB API Key
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
                );
                const data = await response.json();
    
                console.log("TMDB API Response:", data); // ✅ Logs API response
    
                const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    
                if (trailer) {
                    console.log("Found Trailer:", trailer.key);
                    setTrailerUrl(trailer.key); // ✅ Use correct YouTube video ID
                } else {
                    console.error("No trailer found on TMDB");
                }
            } catch (error) {
                console.error("Error fetching TMDB trailer:", error);
            }
        }
    };
    

    console.table(movies); // ✅ Debugging

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map((movie) => (
                    (isLargeRow ? movie.poster_path : movie.backdrop_path) && (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)} // ✅ Click to play trailer
                            className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name || movie.title}
                        />
                    )
                ))}
            </div>

            {/* ✅ Corrected YouTube Component */}
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
