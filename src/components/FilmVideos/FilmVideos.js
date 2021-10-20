import './FilmVideos.scss';

import { useState, useEffect } from 'react';
import { getVideos } from '../../services';
import Loader from '../Loader/Loader';
import VideoTab from '../VideoTab/VideoTab';

function FilmVideos(props) {
  const { id } = props;
  const [videos, setVideos] = useState(null);
  const [tab, setTab] = useState('Trailer')
  const [tabs, setTabs] = useState(
    {
      trailers: true,
      teasers: true,
      clips: true,
      behindTheScenes: true,
      bloopers: true,
      featurettes: true,
      openingCredits: true,
    })

  useEffect(() => {
    getVideos(id).then((result) => {
      let tabs = {
        trailers: true,
        teasers: true,
        clips: true,
        behindTheScenes: true,
        bloopers: true,
        featurettes: true,
        openingCredits: true,
      };
      tabs.trailers = result.results.filter(video => video.type === 'Trailer').length > 0;
      tabs.teasers = result.results.filter(video => video.type === 'Teaser').length > 0;
      tabs.clips = result.results.filter(video => video.type === 'Clip').length > 0;
      tabs.behindTheScenes = result.results.filter(video => video.type === 'Behind the Scenes').length > 0;
      tabs.bloopers = result.results.filter(video => video.type === 'Blooper').length > 0;
      tabs.featurettes = result.results.filter(video => video.type === 'Featurette').length > 0;
      tabs.openingCredits = result.results.filter(video => video.type === 'Opening Credit').length > 0;
      setTabs(tabs);
      setVideos(result.results.filter(video => video.type === tab));
    });
  },[id, tab]);
  
  return (
    videos !== null ? (
      <div>
        <div className="tabs">
          {tabs.trailers ?
            <VideoTab 
              name="Trailers" 
              isActive={tab === 'Trailer'} 
              set={() => setTab('Trailer')} 
            /> 
          : null}
          {tabs.teasers ?
            <VideoTab 
              name="Teasers" 
              isActive={tab === 'Teaser'} 
              set={() => setTab('Teaser')} 
            />
          : null}
          {tabs.clips ?
            <VideoTab 
              name="Clips" 
              isActive={tab === 'Clip'} 
              set={() => setTab('Clip')} 
            />
          : null}
          {tabs.behindTheScenes ?
            <VideoTab 
              name="Behind the Scenes" 
              isActive={tab === "Behind the Scenes"} 
              set={() => setTab('Behind the Scenes')} 
            />
          : null}
          {tabs.bloopers ?
            <VideoTab 
              name="Bloopers" 
              isActive={tab === 'Blooper'} 
              set={() => setTab('Blooper')} 
            />
          : null}
          {tabs.featurettes ?
            <VideoTab 
              name="Featurettes" 
              isActive={tab === 'Featurette'} 
              set={() => setTab('Featurette')} 
            />
          : null}
          {tabs.openingCredits ?
            <VideoTab 
              name="Opening Credits" 
              isActive={tab === 'Opening Credit'} 
              set={() => setTab('Opening Credit')} 
            />
          : null}
        </div>
        <ul className="videos">
          { videos.map(video => ( 
            <li className="videoItem">
              <span className="videoItem__title">{video.name}</span>
              <iframe 
                title={video.name}
                width="450" 
                height="250" 
                src={'https://www.youtube.com/embed/' + video.key}
                frameborder="0"
                allowfullscreen="allowfullscreen">
              </iframe>
            </li>
          ))}
        </ul>
      </div>
    ) : <Loader />
  );
}

export default FilmVideos;