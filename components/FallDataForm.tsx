import { Box, Button, TextField } from '@material-ui/core'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

type FormProps = {
  name: string
}

export const Contact: React.FC<any> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: false,
  })
  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data)
  }

  return (
    <Box
      component="form"
      marginTop="50px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: '入力必須',
          maxLength: {
            value: 30,
            message: '30文字以下で入力してくださいね！',
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="お名前"
            placeholder="田中太郎"
            multiline
            required
            value={value}
            variant="outlined"
            margin="dense"
            onChange={onChange}
            onBlur={onBlur}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
      <Button type="submit" color="primary" variant="contained" size="large">
        送信する
      </Button>
    </Box>
  )
}
