import DialogContent from '@mui/material/DialogContent';
import { alpha, styled } from '@mui/material/styles';

const getOverlayAlpha = (elevation: number): number => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return parseFloat((alphaValue / 100).toFixed(2));
};

const Root = styled(DialogContent, { name: 'ScrollIndicatedDialogContent', slot: 'root' })(({ ownerState, theme }: { ownerState: { elevation?: number }; theme: any }) => {
  const bgcolor =
    theme.palette.mode === 'dark'
      ? {
          backgroundImage: `linear-gradient(${alpha(
            '#fff',
            getOverlayAlpha(ownerState?.elevation || 24),
          )}, ${alpha('#fff', getOverlayAlpha(ownerState?.elevation || 24))})`,
        }
      : theme.palette.background.paper;
  return {
    background:
      `linear-gradient(${bgcolor} 30%, rgba(255, 255, 255, 0)), ` +
      `linear-gradient(rgba(255, 255, 255, 0), ${bgcolor} 70%) 0 100%, ` +
      'radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), ' +
      'radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%;',
    backgroundAttachment: 'local, local, scroll, scroll',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
    overflowY: 'auto',
  };
});

interface ScrollIndicatedDialogContentProps {
  classes?: { shadowScrollDialog?: string };
  className?: string;
  [key: string]: any;
}

export function ScrollIndicatedDialogContent({ classes = {}, className = '', ...otherProps }: ScrollIndicatedDialogContentProps) {
  const ourClassName = [className, classes.shadowScrollDialog].join(' ');
  return <Root className={ourClassName} {...otherProps} />;
}
