import { useState } from 'react';
import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

function PasswordEntry({password, handlePassword}) {
    const [opened, setOpened] = useState(false);
    const valid = password.trim().length >= 6;
  
    return (
      <Tooltip
        label={valid ? 'All good!' : 'Password must include at least 6 characters'}
        position="bottom-start"
        withArrow
        opened={opened}
        color={valid ? 'teal' : undefined}
        withinPortal
      >
        <PasswordInput
          label="Password:"
          // required
          placeholder="Your password"
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          mt="md"
          value={password}
          onChange={handlePassword}
        />
      </Tooltip>
    );
  }

  export default PasswordEntry