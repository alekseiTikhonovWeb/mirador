import { useState, useCallback } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLessSharp';
import ExpandMore from '@mui/icons-material/ExpandMoreSharp';

interface NestedMenuProps extends Omit<React.ComponentPropsWithoutRef<typeof MenuItem>, 'children' | 'icon'> {
  children: React.ReactElement;
  icon?: React.ReactElement | null;
  label: string;
}

export function NestedMenu({ children, icon = null, label, ...otherProps }: NestedMenuProps) {
  const [nestedMenuIsOpen, setNestedMenuIsOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setNestedMenuIsOpen(!nestedMenuIsOpen);
  }, [nestedMenuIsOpen, setNestedMenuIsOpen]);

  return (
    <>
      <MenuItem aria-expanded={nestedMenuIsOpen} onClick={handleMenuClick} divider={nestedMenuIsOpen} {...otherProps}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText slotProps={{ primary: { variant: 'body1' } }}>
          {label}
        </ListItemText>
        {nestedMenuIsOpen ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      {nestedMenuIsOpen && children}
    </>
  );
}
