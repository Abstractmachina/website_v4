
import React from 'react';
import type { AdminViewServerProps, AdminViewServerPropsOnly, DocumentViewClientProps, DocumentViewServerProps, DocumentViewServerPropsOnly } from 'payload';
import EditDefaultViewController from './EditDefaultViewController';


// type Props = {
// }

const EditDefaultViewLoader = async ({ initPageResult, doc, params, searchParams, payload }: DocumentViewServerProps) => {
  const { req, permissions, visibleEntities, locale } = initPageResult;
  console.log({ id: (doc as any)?.id ?? null, params, searchParams, locale })
  console.log(doc)

  const document = await payload.findGlobal({
    slug: 'budget',
  })

  console.log("document", document)

  return (
    <div>
      <EditDefaultViewController />
    </div>
  )
}

export default EditDefaultViewLoader;