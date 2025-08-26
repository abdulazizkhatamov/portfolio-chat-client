import { FieldArray, Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { useCreateChat } from '../hooks/useChatMutations'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet'

interface ChatFormValues {
  name: string
  members: Array<string>
}

const CreateChatSchema = Yup.object().shape({
  name: Yup.string().required('Chat name is required.'),
  members: Yup.array()
    .of(Yup.string().email('Invalid email'))
    .min(1, 'Members cannot be empty.'),
})

// ✅ Custom Formik-compatible shadcn Input
function FormikInput({
  label,
  ...props
}: {
  label?: string
  name: string
  type?: string
  placeholder?: string
}) {
  const [field, meta] = useField(props.name)
  return (
    <div className="grid gap-1 w-full">
      {label && (
        <Label htmlFor={props.name} className="mb-1">
          {label}
        </Label>
      )}
      <Input
        id={props.name}
        {...field}
        {...props}
        aria-invalid={!!(meta.error && meta.touched)}
      />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  )
}

export default function NewChatForm({ onSuccess }: { onSuccess?: () => void }) {
  const post = useCreateChat()

  return (
    <Formik<ChatFormValues>
      initialValues={{
        name: '',
        members: [''],
      }}
      validationSchema={CreateChatSchema}
      validateOnMount
      onSubmit={(values, { resetForm }) => {
        post.mutate(values, {
          onSuccess: () => {
            resetForm()
            onSuccess?.()
          },
        })
      }}
    >
      {({ values, isValid }) => (
        <Form className="space-y-6">
          <SheetHeader>
            <SheetTitle>New Chat</SheetTitle>
            <SheetDescription>
              Create a new chat by setting a name and adding members.
            </SheetDescription>
          </SheetHeader>

          {/* Chat Name */}
          <div className="px-4">
            <FormikInput name="name" label="Chat Name" type="text" />
          </div>

          {/* Members */}
          <div className="px-4">
            <Label className="mb-2">Members</Label>
            <FieldArray name="members">
              {({ push, remove }) => (
                <div className="space-y-2">
                  {values.members.map((_, index) => (
                    <div key={index} className="flex gap-2 items-start w-full">
                      <FormikInput
                        name={`members[${index}]`}
                        type="email"
                        placeholder="Enter email address"
                      />
                      {values.members.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => push('')}
                  >
                    + Add Member
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={post.isPending || !isValid}>
              {post.isPending ? 'Creating...' : 'Create'}
            </Button>
            <Button variant="outline" type="button" onClick={onSuccess}>
              Close
            </Button>
          </SheetFooter>
        </Form>
      )}
    </Formik>
  )
}
