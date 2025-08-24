import { Formik } from 'formik'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet'
import { usePostConversations } from '@/features/sidebar/hooks/useConversations'

interface NewContactFormProps {
  close: () => void
}

export default function NewContactForm({ close }: NewContactFormProps) {
  const post = usePostConversations()

  return (
    <Formik
      initialValues={{ type: 'dm', name: '', email: '' }}
      onSubmit={(values) => {
        const payload = {
          type: values.type,
          name: values.name,
          members: [values.email], // put email inside members array
        }

        post.mutate(payload, {
          onSuccess: () => {
            close()
          },
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <SheetContent>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>New Contact</SheetTitle>
              <SheetDescription>
                Create a new contact. Click create when you&apos;re done.
              </SheetDescription>
            </SheetHeader>

            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="contact-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  aria-invalid={!!(errors.name && touched.name)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="contact-email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  aria-invalid={!!(errors.email && touched.email)}
                />
              </div>
            </div>

            <SheetFooter>
              <Button type="submit" disabled={post.isPending}>
                {post.isPending ? 'Creating...' : 'Create'}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" type="button">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      )}
    </Formik>
  )
}
