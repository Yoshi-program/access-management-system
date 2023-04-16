import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import useUserRole from '../hooks/useUserRole'
import { useRouter } from 'next/router'
import type { SelectChangeEvent } from '@mui/material'
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'

const Admin: NextPage = () => {
  const { user, signUp, signIn, signOut } = useAuth()
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const userRoleInfo = useUserRole()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organization, setOrganization] = useState('RAISON DETRE')

  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log(userRoleInfo.organization)
      // ユーザーが正常にサインインしたら、遷移先ページにリダイレクトする
      // router.push('/dashboard')
    }
  }, [user, router, userRoleInfo])

  const handleOrganizationChange = (
    event: SelectChangeEvent<string> // 型変更
  ) => {
    setOrganization(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (authMode === 'signin') {
      try {
        await signIn(email, password)
        console.log('Successfully signed in.')
      } catch (error) {
        console.error('Error in signIn:', error)
      }
    } else {
      try {
        await signUp(email, password, organization)
        console.log('Successfully signed up.')
      } catch (error) {
        console.error('Error in signUp:', error)
      }
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('Successfully signed out.')
    } catch (error) {
      console.error('Error in signOut:', error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          marginTop: 8,
          gap: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {authMode === 'signin' ? 'サインイン' : 'サインアップ'}
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              gap: 2,
              width: '100%',
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {authMode === 'signup' && (
              <>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="organization-label">Organization</InputLabel> {/* 追加 */}
                  <Select
                    labelId="organization-label"
                    id="organization"
                    value={organization}
                    onChange={handleOrganizationChange}
                    label="Organization"
                    required
                  >
                    <MenuItem value="RAISON DETRE">RAISON DETRE</MenuItem>
                    <MenuItem value="INIAD.ts">INIAD.ts</MenuItem>
                    <MenuItem value="INIAD Developers">INIAD Developers</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {authMode === 'signin' ? 'サインイン' : 'サインアップ'}
            </Button>
          </Box>
        </form>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            gap: 1,
            width: '100%',
          }}
        >
          <Typography variant="body2">
            {authMode === 'signin' ? 'アカウントをお持ちでない方' : 'すでにアカウントをお持ちの方'}
          </Typography>
          <Button
            color="primary"
            onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
          >
            {authMode === 'signin' ? 'サインアップ' : 'サインイン'}
          </Button>
        </Box>
        {user && (
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              gap: 2,
              width: '100%',
            }}
          >
            <Typography variant="body1">
              Signed in as {user.email}, role: {userRoleInfo?.role}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleSignOut}>
              Sign out
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Admin
