import { useEffect, useState, useCallback } from 'react';
import './Hero.css';
import { YOUTUBE_API_KEY } from './secret_key.js'; 

const regionCodes = ['US', 'IN', 'GB', 'CA', 'JP', 'AU', 'CN'];

const generateApiUrl = (regionCode, genre, pageToken = null) => {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&safeSearch=strict&regionCode=${regionCode}&relevanceLanguage=en&q=${genre}&key=${YOUTUBE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
};

const Hero = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [genre, setGenre] = useState(''); 

  const fetchChannelLogo = async (channelId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch channel logo');
      }
      const data = await response.json();
      return data.items[0]?.snippet.thumbnails.default.url || '';
    } catch (error) {
      console.error('Error fetching channel logo:', error);
      return '';
    }
  };
  
  const fetchVideos = useCallback(async (pageToken = null) => {
    setLoading(true);
    setError(null);
    try {
      const regionCode = regionCodes[0];
      const apiUrl = generateApiUrl(regionCode, genre, pageToken);
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
  
      const data = await response.json();
  
      const videosWithLogos = await Promise.all(
        data.items.map(async (video) => {
          const channelLogo = await fetchChannelLogo(video.snippet.channelId);
          return { ...video, channelLogo };
        })
      );
  
      setVideos((prevVideos) =>
        pageToken ? [...prevVideos, ...videosWithLogos] : videosWithLogos
      );
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [genre]);  

  useEffect(() => {
    fetchVideos(); 
  }, [fetchVideos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          fetchVideos(nextPageToken);
        }
      },
      { threshold: 1.0 }
    );

    const target = document.querySelector('#scroll-anchor');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [nextPageToken, fetchVideos]);

  const getTimeAgo = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor((currentDate - publishedDate) / 1000);

    const timeIntervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (let interval of timeIntervals) {
      const count = Math.floor(differenceInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  };

  const handleFilterClick = (selectedGenre) => {
    const normalizedGenre = selectedGenre === 'All' ? '' : selectedGenre.toLowerCase();
    
    if (genre === normalizedGenre) {
      // Force re-fetch even if the genre is the same
      setVideos([]);
      setNextPageToken(null);
      fetchVideos();
    } else {
      // Update the genre and reset the video state
      setVideos([]);
      setNextPageToken(null);
      setGenre(normalizedGenre);
    }
  };
  

  return (
    <div className="hero-container">
      <div className="filter">
        <ul className="filter-list">
          {['All', 'Entertainment', 'Technology', 'Education', 'Gaming', 'Music', 'Sports', 'News'].map(
            (category) => (
              <li
                key={category}
                className={`list ${genre === category.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleFilterClick(category === 'All' ? '' : category.toLowerCase())}
              >
                {category}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card-link"
          >
            <div className="video-card">
              {/* Thumbnail */}
              <div className="thumbnail-container">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="thumbnail"
                />
              </div>

              {/* Video Details */}
              <div className="video-details">
                {/* Title and Channel Logo */}
                <div className="title-container">
                  <img
                    src={video.channelLogo}
                    alt={`${video.snippet.channelTitle} logo`}
                    className="channel-logo"
                  />
                  <h3 className="video-title">{video.snippet.title}</h3>
                </div>

                {/* Channel Name */}
                <p className="channel-name">{video.snippet.channelTitle}</p>

                {/* Video Views and Time Ago */}
                <div className="details">
                  <p className="video-views">1M views</p> {/* Placeholder */}
                  <p className="time-ago">{getTimeAgo(video.snippet.publishedAt)}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">Error: {error}</div>}

      <div id="scroll-anchor" style={{ height: '1px' }}></div>
    </div>
  );
};

export default Hero;
