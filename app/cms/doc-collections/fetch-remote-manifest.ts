import Ajv from "ajv"
import invariant from "tiny-invariant"
import { JSON_MANIFEST_FILENAME } from "./constants"
import { downloadFileFromSource } from "./download-file-from-source"
import { DocCollectionManifest, DocCollectionSource } from "./types"
import manifestSchema from "~/data/doc-collection-manifest-schema.json"
import { ValidationError } from "../errors/validation-error"

export type FetchRemoteManifestOptions = DocCollectionSource & {}

export const fetchRemoteManifest = async ({
  ...source
}: FetchRemoteManifestOptions): Promise<DocCollectionManifest> => {
  const buffer = await downloadFileFromSource(source, JSON_MANIFEST_FILENAME)
  const text = buffer.toString()
  let data: unknown

  try {
    data = JSON.parse(text)
  } catch (er) {
    throw new Error(`Invalid json`)
  }

  const ajv = new Ajv()
  const validate = ajv.compile(manifestSchema)
  const isValid = validate(data)

  if (!isValid) {
    const { errors } = validate
    if (errors && errors.length > 0) {
      const [firstError] = errors
      invariant(firstError)
      const dataPath = firstError.schemaPath || `root`
      const message = firstError.message || `(unknown)`
      throw new ValidationError(message, dataPath)
    }

    throw new ValidationError("no context from ajv about this error")
  }

  return data as DocCollectionManifest
}
