/* eslint-disable react/prop-types */
import UsernameEntry from './UsernameEntry'
import PasswordEntry from './PasswordEntry'
import { Button, Group } from '@mantine/core'

function LoginForm({handleSubmit, username, password, handleUsername, handlePassword}) {
  return (
    <>
    <form onSubmit={handleSubmit}>
      <UsernameEntry username={username} handleUsername={handleUsername} />
      <PasswordEntry password={password} handlePassword={handlePassword} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  </>
  )
}

export default LoginForm