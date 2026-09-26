import Typography from '@mui/material/Typography';

interface SidebarIndexItemProps {
  label: string;
}

/** */
export function SidebarIndexItem({ label }: SidebarIndexItemProps) {
  return <Typography variant="body1">{label}</Typography>;
}
