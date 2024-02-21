import { TextInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

function UsernameEntry({username, handleUsername}) {
    const rightSection = (
      <Tooltip
        label="We store your data securely"
        position="top-end"
        withArrow
        transitionProps={{ transition: 'pop-bottom-right' }}
      >
        <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
          <Center>
            <IconInfoCircle style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </Center>
        </Text>
      </Tooltip>
    );
  
    return (
      <TextInput
        rightSection={rightSection}
        label="Username:"
        value={username}
        onChange={handleUsername}
      />
    );
  }

export default UsernameEntry