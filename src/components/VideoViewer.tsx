import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
}));

const StyledVideo = styled('video')(() => ({
  maxHeight: '100%',
  width: '100%',
}));

interface VideoViewerProps {
  captions?: any[];
  videoOptions?: React.VideoHTMLAttributes<HTMLVideoElement>;
  videoResources?: any[];
}

/** */
export function VideoViewer({ captions = [], videoOptions = {}, videoResources = [] }: VideoViewerProps) {
  return (
    <StyledContainer>
      <StyledVideo {...videoOptions}>
        {videoResources.map((video) => (
          <source key={video.io} src={video.id} type={video.getFormat()} />
        ))}
        {captions.map((caption) => (
          <track key={caption.id} src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
        ))}
      </StyledVideo>
    </StyledContainer>
  );
}
