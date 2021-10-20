import './VideoTab.scss';

function VideoTab(props) {
  const { name, isActive, set } = props;

  return (
    <div className={isActive ? 'tab active' : 'tab'} onClick={set}>
      <span>{name}</span>
    </div>
  );
}

export default VideoTab;