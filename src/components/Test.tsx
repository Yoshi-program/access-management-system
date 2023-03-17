import React, { useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  })
)

interface ContactFormData {
  name: string
  email: string
}

function ContactForm() {
  const classes = useStyles()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
  })

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:8081/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        console.log('Form submitted successfully!')
      } else {
        console.error('Form submission failed.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
      />
      <Button className={classes.submitButton} variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
