import { NewsItem } from '../components/NewsItem'
import news from '../data/news.json'
import '../App.css'

export const News = () => {
    return (
        <div className="container">
            {
                news.map((n) => (
                    <div className='mt-2 mb-2' style={{height: "fit-content"}}>
                        <NewsItem news={n} />
                    </div>
                ))
            }
        </div>
    )
}