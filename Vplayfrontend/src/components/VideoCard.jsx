import './videoCard.css';
import { useNavigate } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './Card3D'; // Import 3D card effect components

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.filename}`);
  };

  return (
    <CardContainer className="videoCard-container">
      <CardBody className="videoCard-body">
        <CardItem className="videoCard" onClick={handleClick} translateZ={80}>
          <div className="videoCard-blur">
            <img
              src={`data:image/jpeg;base64,${video.thumbnail}`}
              alt={video.title}
              className="thumbnail"
            />
            <h3>{video.title}</h3>
            <p>{video.ownerName}</p>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default VideoCard;
