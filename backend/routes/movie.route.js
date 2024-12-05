import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers.js/movie.controller.js';

const router = express.Router();


router.get("/trending", getTrendingMovie); //ภาพใหญ่โชว์เเค่อันเดียว ทงโท่ สุ่มไปเรื่อยๆถ้ารีเฟรชภาพใหญ่สุดเลย
router.get("/:id/trailers", getMovieTrailers); //กดเข้าไปดูก็มีtraier
router.get("/:id/details", getMovieDetails); //อยู่ใต้เเต่ละTrailerนั้นๆตามไอดี
router.get("/:id/similar", getSimilarMovies); //โชว์หนังที่คล้ายๆกันก็ต้องพึ่งไอดีไง ก็เราต้ต้องยึดจากหนังที่คล้ายๆกัน
router.get("/:category", getMoviesByCategory); // มีทั้ง Now Playing,Top rated,Popular,Upcoming เหมือนตอนเราดูหนังเเหละ
//อันไหนมีidก็เเปลว่ามันตกำลังยึดหนังอันนั้นอยู่ เดี่ยวๆก็เลบต้องใช้ไอดีเฉพาะอะเเหละ

export default router;