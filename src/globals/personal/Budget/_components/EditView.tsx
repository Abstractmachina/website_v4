
import React from 'react';
import type { AdminViewServerProps, AdminViewServerPropsOnly, DocumentViewClientProps, DocumentViewServerProps, DocumentViewServerPropsOnly } from 'payload';


// type Props = {
// }

const EditView = async ({ initPageResult, doc, params, searchParams, payload }: DocumentViewServerProps) => {
  const { req, permissions, visibleEntities, locale } = initPageResult;
  console.log({ id: (doc as any)?.id ?? null, params, searchParams, locale })
  console.log(doc)

  const document = await payload.findGlobal({
    slug: 'budget',
  })

  console.log("document", document)

  return (
    <div>EditView</div>
  )
}

export default EditView;