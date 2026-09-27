import { useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface CollapsibleSectionProps {
  children: React.ReactNode;
  id: string;
  label: string;
}

export function CollapsibleSection({ children, id, label }: CollapsibleSectionProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setOpen(isExpanded);
    },
    [setOpen],
  );

  return (
    <Accordion
      slotProps={{ heading: { component: 'h4' } }}
      id={id}
      elevation={0}
      expanded={open}
      onChange={handleChange}
      disableGutters
      square
      variant={"compact" as any}
    >
      <AccordionSummary
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        aria-label={t(open ? 'collapseSection' : 'expandSection', { section: label })}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="overline">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
