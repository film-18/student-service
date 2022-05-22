export const RequestTopic = ({request, toggleModal}) => {
    return (
        <div className="request-topic-item" style={{"--bg-img": `url(${request.img})`}} onClick={toggleModal(request)}>
            <div className="request-topic-detail">
                <div className="request-topic-name">{request.name}</div>
                <div className="request-topic-category">{request.category.join(" ")}</div>
            </div>
        </div>
    )
}