'use client';

import { useState, useEffect } from 'react'
import './index.scss'
import axios from 'axios'
import { log } from 'console';
import { rule } from 'postcss';
import MovieCard from '../MovieCard';
import { Movie } from '@/app/types/movie';
import ReactLoading from 'react-loading'


export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Função responsavel por retornar os dados da API

    useEffect(() => {
        getMovies();
        // Utilizamos um array vazio para avisar que a requisição só será feita 1 vez quando recarregar a página
    }, [])

    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
            params: {
                api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
                language: 'pt-BR'
            }
        }).then(response => {
            // Acessando apenas os results vamos retornar somente o necessario
            setMovies(response.data.results)
            console.log(response.data.results);

        });

        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type="spin" color="#6046FF" height="5%" width="5%" />
            </div>
        )
    }
    return (
        <ul className="movie-list">
            {movies.map((movie) =>
                <MovieCard
                    key={movie.id}
                    movie={movie} />
            )}
        </ul>
    )
}