import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/CheckSharp';

interface Language {
  current: boolean;
  label: string;
  locale: string;
}

interface LanguageSettingsProps {
  handleClick: (locale: string) => void;
  languages: Language[];
}

export function LanguageSettings({ handleClick, languages }: LanguageSettingsProps) {
  return (
    <>
      {languages.map((language) => (
        <MenuItem
          aria-selected={language.current}
          key={language.locale}
          lang={language.locale}
          onClick={() => { handleClick(language.locale); }}
        >
          <ListItemIcon>{language.current && <CheckIcon />}</ListItemIcon>
          <ListItemText slotProps={{ primary: { variant: 'body1' } }}>
            {language.label}
          </ListItemText>
        </MenuItem>
      ))}
    </>
  );
}
