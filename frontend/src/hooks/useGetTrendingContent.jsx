import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "axios";

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const {contentType} =  useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            const res  = await axios.get(`/api/v1/${contentType}/trending`)
            setTrendingContent(res.data.content) 
            {/* whatever is Movies or TvShows wwe use content its is both of then เเล้วค่อยให้state ${contentType} เป็นตัวจัดการ โคตรดีstate*/}
        }
        getTrendingContent();
    }, [contentType]);  {/* ในparameterนี้เเหละ ถ้าcontnet typeเปลี่ยน | หน้านี้เป็นหน้าที่เอาstateจากcontent.jsมาโชว์ใน ui ให้userเห็น*/}
    return {trendingContent};
}



export default useGetTrendingContent

