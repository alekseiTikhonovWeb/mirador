import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ErrorIcon from '@mui/icons-material/ErrorOutlineSharp';

interface TitleTypographyProps extends TypographyProps {
  children: React.ReactNode;
  sx?: TypographyProps['sx'];
}

/** */
function TitleTypography({ children, ...props }: TitleTypographyProps) {
  return (
    <Typography
      variant="h2"
      noWrap
      {...props}
      sx={[
        {
          color: 'inherit',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {children}
    </Typography>
  );
}

const StyledTitleTypography = styled(TitleTypography)(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  paddingLeft: theme.spacing(0.5),
}));

const StyledTitle = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  paddingLeft: theme.spacing(0.5),
}));

interface WindowTopBarTitleProps {
  error?: string | null;
  hideWindowTitle?: boolean;
  isFetching?: boolean;
  manifestTitle?: string;
}

/**
 * WindowTopBarTitle
 */
export function WindowTopBarTitle({ error = null, hideWindowTitle = false, isFetching = false, manifestTitle = '' }: WindowTopBarTitleProps) {
  let title;
  if (isFetching) {
    title = (
      <StyledTitleTypography>
        <Skeleton variant="text" />
      </StyledTitleTypography>
    );
  } else if (error) {
    title = (
      <>
        <ErrorIcon color="error" />
        <StyledTitleTypography color="textSecondary">{error}</StyledTitleTypography>
      </>
    );
  } else if (hideWindowTitle) {
    title = <StyledTitle />;
  } else {
    title = <StyledTitleTypography>{manifestTitle}</StyledTitleTypography>;
  }
  return title;
}
