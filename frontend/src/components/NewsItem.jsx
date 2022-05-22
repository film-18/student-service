export const NewsItem = (news) => {
    return (
        <div className="news-item">
            <div className="news-img"><img src={news.news.images[0]} width="100%" /></div>
            <div className="news-detail">
                <div className="news-topic">{news.news.topic}</div>
                <span className="news-date">{news.news.date}</span>
                <div className="news-short">{news.news.short}</div>
            </div>
        </div>
    )
}