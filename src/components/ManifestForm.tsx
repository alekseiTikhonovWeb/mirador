import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

interface ManifestFormProps {
  addResource: (url: string) => void;
  addResourcesOpen: boolean;
  onCancel?: (() => void) | null;
  onSubmit?: () => void;
}

export function ManifestForm({ addResourcesOpen, addResource, onSubmit = () => {}, onCancel = null }: ManifestFormProps) {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState('');

  const handleCancel = () => {
    onCancel();
    setFormValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormValue(event.target.value);
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addResource(formValue);
    onSubmit();
    setFormValue('');
  };

  if (!addResourcesOpen) return null;

  return (
    <form onSubmit={formSubmit}>
      <Grid container spacing={2} columns={12} sx={{ mt: 0.5 }}>
        <Grid size={{ sm: 'grow', xs: 12 }}>
          <TextField
            autoFocus
            fullWidth
            value={formValue}
            id="manifestURL"
            type="text"
            onChange={handleInputChange}
            variant="filled"
            label={t('addManifestUrl')}
            helperText={t('addManifestUrlHelp')}
            slotProps={{
              inputLabel: { shrink: true },
              inputProps: { style: { typography: 'body1' } },
            } as any}
          />
        </Grid>
        {onCancel && (
          <Grid size="auto">
            <Button onClick={handleCancel}>{t('cancel')}</Button>
          </Grid>
        )}
        <Grid size="auto">
          <Button id="fetchBtn" type="submit" variant="contained" color="primary">
            {t('fetchManifest')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
