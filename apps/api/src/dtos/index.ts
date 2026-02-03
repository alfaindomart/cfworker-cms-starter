import * as schema from '../../../../db/drizzle/schema/schema'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import {z} from 'zod'

export const ZUserInsert = createInsertSchema(schema.users)
export const ZUserUpdate = createUpdateSchema(schema.users)
export const ZUserSelect = createSelectSchema(schema.users)

export const ZRoleInsert = createInsertSchema(schema.roles)
export const ZRoleUpdate = createUpdateSchema(schema.roles)
export const ZRoleSelect = createSelectSchema(schema.roles)

export const ZPermissionInsert = createInsertSchema(schema.permissions)
export const ZPermissionUpdate = createUpdateSchema(schema.permissions)
export const ZPermissionSelect = createSelectSchema(schema.permissions)

export const ZCollectionInsert = createInsertSchema(schema.collections)
export const ZCollectionUpdate = createUpdateSchema(schema.collections)
export const ZCollectionSelect = createSelectSchema(schema.collections)

export const ZFieldInsert = createInsertSchema(schema.fields)
export const ZFieldUpdate = createUpdateSchema(schema.fields)
export const ZFieldSelect = createSelectSchema(schema.fields)

export const ZEntryInsert = createInsertSchema(schema.entries)
export const ZEntryUpdate = createUpdateSchema(schema.entries)
export const ZEntrySelect = createSelectSchema(schema.entries)

