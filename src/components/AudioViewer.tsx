import { Fragment } from 'react';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
});

const StyledAudio = styled('audio')({
  width: '100%',
});

interface AudioViewerProps {
  audioOptions?: React.ComponentPropsWithoutRef<'audio'>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audioResources?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captions?: any[];
}

/** */
export function AudioViewer({ audioOptions = {}, audioResources = [], captions = [] }: AudioViewerProps) {
  return (
    <StyledContainer>
      <StyledAudio {...audioOptions}>
        {audioResources.map((audio) => (
          <Fragment key={audio.id}>
            <source src={audio.id} type={audio.getFormat()} />
          </Fragment>
        ))}
        {captions.map((caption) => (
          <Fragment key={caption.id}>
            <track src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
          </Fragment>
        ))}
      </StyledAudio>
    </StyledContainer>
  );
}
