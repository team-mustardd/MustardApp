import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import settings from '../settings.js'

module.exports = {
  async getSecret (name) {
    const client = await getSecretClient()

    const secretName = name.replace(/_/g, '-')
    const secret = await client.getSecret(secretName)
    return secret.value
  }
}

var secretClient = null

async function getSecretClient () {
  if (secretClient === null) {
    const keyVaultName = await settings.getSetting('KEYVAULT_NAME')
    const keyVaultUri = `https://${keyVaultName}.vault.azure.net`

    const credential = new DefaultAzureCredential()
    secretClient = new SecretClient(keyVaultUri, credential)
  }

  return secretClient
}
