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

interface NewGroupFormProps {
  close: () => void
}

export default function NewGroupForm({ close }: NewGroupFormProps) {
  const post = usePostConversations()

  return (
    <Formik
      initialValues={{ type: 'group', name: '', members: [] }}
      onSubmit={(values) => {
        post.mutate(values, {
          onSuccess: () => {
            close() // Close sheet after successful creation
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
              <SheetTitle>New Group</SheetTitle>
              <SheetDescription>
                Create a new group. Click create when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="group-name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="group-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  aria-invalid={!!(errors.name && touched.name)}
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
