/**
 * Provides a buildable TS app to test before trying to compiles examples
 * A failure here should indicate something out of date below or more critical
 */
import { Client, ThreadID } from '@textile/hub'
import { Database, UserAuth, Where } from '@textile/threads'
export async function threadCanary (auth: UserAuth, name: string) {
  const db = Database.withUserAuth(auth, name)
  return db
}

async function hubCanary (client: Client, threadId: ThreadID) {
   const q = new Where('firstName').eq('Buzz')
   const r = await client.find(threadId, 'Astronauts', q)
   // Extract just the ids
   const ids = r.instancesList.map((instance: any) => instance._id)

   console.log(`Found ${ids.length} entries`)

   // Cleanup!
   await client.delete(threadId, 'Astronauts', ids)
}

export default hubCanary