import { createSelector } from 'reselect'

const getCurrentSchemaName = state => state.app.schema
const getCurrentItemId = state => state.app.itemId
const getCurrentAppView = state => state.app.view
const getCollections = state => state.data.collections
const getSchemas = state => state.data.schema
const getPureSchemas = state => state.data.pureschema

export const getCurrentCollection = createSelector(
  [getCollections, getCurrentSchemaName],
  (collections, schema) => collections[schema]
)

export const getCurrentView = createSelector(
  [getCurrentAppView],
  view => view
)

export const getCurrentItem = createSelector(
  [getCurrentCollection, getCurrentItemId],
  (collection = {}, id = null) => collection[id]
)

export const getCurrentSchema = createSelector(
  [getCurrentSchemaName, getSchemas],
  (schemaName, schemas) => schemas[schemaName] || null
)

export const getPureSchema = createSelector(
  [getCurrentSchemaName, getPureSchemas],
  (schemaName, pureschema) => pureschema[schemaName]
)

export const getConfigEndpoint = state => console.log(state) || state.config.settings.endpoint
export const getConfigNoncense = state => state.config.settings.noncense
