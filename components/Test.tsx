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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(`Name: ${formData.name}, Email: ${formData.email}`)
    // Here you can add your logic to submit the form to a server or send an email.
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
