import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers.js/movie.controller.js';

const router = express.Router();


router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/datails", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);


export default router;